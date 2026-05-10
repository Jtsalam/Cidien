import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { getCurrentCenterId, getCurrentDemoContext } from '@/lib/demo';
import { prisma } from '@/lib/prisma';
import { SESSION_PDFS_BUCKET, supabaseServer } from '@/lib/supabaseServer';
import { buildSessionApprovedNotesPdf } from '@/lib/pdf/buildSessionApprovedNotesPdf';

type PendingRow = {
  id: number;
  patient_note: string;
  noteRecording: { createdAt: Date } | null;
  bed_info: {
    bed_letter: string;
    room_info: { room_number: number };
    patient_info: { patient_name: string } | null;
  };
};

function buildApprovalDisplayName(
  roomNumber: number,
  bedLetter: string,
  at: Date,
): string {
  const when = at.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  return `Room ${roomNumber}, Bed ${bedLetter} — ${when}`.slice(0, 200);
}

async function resolveDemoSessionId(cookieStore: Awaited<ReturnType<typeof cookies>>): Promise<string | null> {
  const fromCookie = cookieStore.get('demo_session_id')?.value;
  if (fromCookie) {
    const valid = await prisma.demo_session.findFirst({
      where: { session_id: fromCookie, expires_at: { gt: new Date() } },
      select: { session_id: true },
    });
    if (valid) return valid.session_id;
  }
  const centerId = await getCurrentCenterId(cookieStore);
  if (!centerId) return null;
  const demoSession = await prisma.demo_session.findFirst({
    where: { center_id: centerId, expires_at: { gt: new Date() } },
    orderBy: { created_at: 'desc' },
    select: { session_id: true },
  });
  return demoSession?.session_id ?? null;
}

async function fetchPendingRows(
  userId: number,
  centerId: number,
  roomNumber: number | undefined,
  bed: string | null | undefined,
): Promise<PendingRow[]> {
  return prisma.room_data.findMany({
    where: {
      is_approved: 0,
      bed_info: {
        assigned_nurse_id: userId,
        ...(bed && bed !== 'ALL' ? { bed_letter: String(bed) } : {}),
        room_info: {
          center_id: centerId,
          ...(roomNumber !== undefined && !Number.isNaN(roomNumber) ? { room_number: roomNumber } : {}),
        },
      },
    },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      patient_note: true,
      noteRecording: { select: { createdAt: true } },
      bed_info: {
        select: {
          bed_letter: true,
          room_info: { select: { room_number: true } },
          patient_info: { select: { patient_name: true } },
        },
      },
    },
  });
}

function groupPendingByRoomBed(rows: PendingRow[]): PendingRow[][] {
  const map = new Map<string, PendingRow[]>();
  for (const row of rows) {
    const rn = row.bed_info.room_info.room_number;
    const bl = row.bed_info.bed_letter;
    const key = `${rn}\0${bl}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(row);
  }
  return Array.from(map.values());
}

async function processOneApprovalBatch(
  pending: PendingRow[],
  sessionId: string | null,
  userId: number,
): Promise<{ updated: number; pdfCreated: boolean }> {
  if (pending.length === 0) return { updated: 0, pdfCreated: false };

  const ids = pending.map((p) => p.id);
  const roomNumber = pending[0].bed_info.room_info.room_number;
  const bedLetter = pending[0].bed_info.bed_letter;
  const approvedAt = new Date();
  let pdfCreated = false;

  if (sessionId) {
    const session = await prisma.demo_session.findFirst({
      where: { session_id: sessionId, expires_at: { gt: new Date() } },
      select: {
        session_id: true,
        medicalcenter_info: { select: { center_name: true } },
      },
    });

    if (session) {
      const pdfRows = pending.map((r, i) => ({
        index: i + 1,
        roomNumber: r.bed_info.room_info.room_number,
        bedLetter: r.bed_info.bed_letter,
        patientNote: r.patient_note || '',
        recordedAt: r.noteRecording?.createdAt ?? null,
      }));

      const nurse = await prisma.user_info.findUnique({
        where: { user_id: userId },
        select: { user_name: true, staff_id: true },
      });
      const patientName =
        pending[0].bed_info.patient_info?.patient_name?.trim() || 'Not assigned';

      const pdfBytes = await buildSessionApprovedNotesPdf(pdfRows, {
        centerName: session.medicalcenter_info.center_name,
        nurseName: nurse?.user_name ?? 'Unknown',
        nurseStaffId: nurse?.staff_id ?? '—',
        patientName,
      });

      const fileId = randomUUID();
      const filePath = `exports/session_${sessionId}/approvals/${fileId}.pdf`;
      const displayName = buildApprovalDisplayName(roomNumber, bedLetter, approvedAt);

      const { error: bucketError } = await supabaseServer.storage.createBucket(SESSION_PDFS_BUCKET, {
        public: false,
      });
      if (bucketError && !bucketError.message.toLowerCase().includes('already exists')) {
        throw new Error(`Storage bucket unavailable: ${bucketError.message}`);
      }

      const { error: uploadError } = await supabaseServer.storage
        .from(SESSION_PDFS_BUCKET)
        .upload(filePath, pdfBytes, {
          contentType: 'application/pdf',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message ?? 'PDF upload failed');
      }

      await prisma.$transaction(async (tx) => {
        await tx.room_data.updateMany({
          where: { id: { in: ids } },
          data: { is_approved: 1 },
        });

        const created = await tx.approvalPdfExport.create({
          data: {
            filePath,
            displayName,
            noteCount: pending.length,
            sessionId,
            userId,
          },
          select: { id: true },
        });

        await tx.approvalPdfExportRow.createMany({
          data: ids.map((roomDataId) => ({
            exportId: created.id,
            roomDataId,
          })),
        });
      });

      pdfCreated = true;
    } else {
      await prisma.room_data.updateMany({
        where: { id: { in: ids } },
        data: { is_approved: 1 },
      });
    }
  } else {
    await prisma.room_data.updateMany({
      where: { id: { in: ids } },
      data: { is_approved: 1 },
    });
  }

  return { updated: pending.length, pdfCreated };
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get('staff_Id')?.value;
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found in cookies' }, { status: 401 });
    }

    const body = await request.json();
    const {
      room,
      bed,
      dryRun,
    } = body as { room?: string | null; bed?: string | null; dryRun?: boolean };

    const demoContext = await getCurrentDemoContext(cookieStore);
    const centerIdFromOrg = await getCurrentCenterId(cookieStore);

    const effectiveCenterId = demoContext.centerId ?? centerIdFromOrg;
    if (effectiveCenterId == null) {
      return NextResponse.json(
        { error: 'Center context is required. Sign in with an organization or demo session.' },
        { status: 400 },
      );
    }

    const user = await prisma.user_info.findFirst({
      where: {
        staff_id: staffId,
        center_id: effectiveCenterId,
      },
      select: { user_id: true, center_id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const roomNumber = room ? parseInt(String(room), 10) : undefined;
    if (room && (roomNumber === undefined || Number.isNaN(roomNumber))) {
      return NextResponse.json({ error: 'Invalid room number' }, { status: 400 });
    }

    const bedNorm = bed == null || bed === '' ? 'ALL' : String(bed);

    const allPending = await fetchPendingRows(user.user_id, effectiveCenterId, roomNumber, bedNorm);

    if (dryRun) {
      const groups = groupPendingByRoomBed(allPending);
      const targets = groups.map((g) => ({
        roomNumber: g[0].bed_info.room_info.room_number,
        bedLetter: g[0].bed_info.bed_letter,
        pendingCount: g.length,
      }));
      return NextResponse.json({ success: true, dryRun: true, targets });
    }

    if (allPending.length === 0) {
      return NextResponse.json({
        success: true,
        updated: 0,
        batches: 0,
        newlyApprovedRoomNumbers: [],
        message: 'No pending notes matched this filter.',
      });
    }

    const specificBed = bedNorm !== 'ALL';
    const specificRoom = roomNumber !== undefined && !Number.isNaN(roomNumber);

    let batches: PendingRow[][];
    if (specificRoom && specificBed) {
      batches = [allPending];
    } else {
      batches = groupPendingByRoomBed(allPending);
    }

    const sessionId = await resolveDemoSessionId(cookieStore);
    let totalUpdated = 0;
    const roomsTouched = new Set<string>();

    for (const batch of batches) {
      const { updated } = await processOneApprovalBatch(batch, sessionId, user.user_id);
      totalUpdated += updated;
      if (updated > 0) {
        roomsTouched.add(String(batch[0].bed_info.room_info.room_number));
      }
    }

    return NextResponse.json({
      success: true,
      updated: totalUpdated,
      batches: batches.length,
      newlyApprovedRoomNumbers: Array.from(roomsTouched),
      message:
        totalUpdated > 0
          ? `Approved ${totalUpdated} note${totalUpdated === 1 ? '' : 's'} across ${batches.length} export${batches.length === 1 ? '' : 's'}.`
          : 'No pending notes matched this filter.',
    });
  } catch (error) {
    console.error('Error approving notes:', error);
    const msg = error instanceof Error ? error.message : 'Failed to approve notes';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
