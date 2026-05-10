import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { getCurrentCenterId, getCurrentDemoContext } from '@/lib/demo';
import { prisma } from '@/lib/prisma';

function audioPathToUrl(audioPath: string) {
  // Role: Build a storage proxy URL from Supabase object path.
  return `/api/recordings/audio?path=${encodeURIComponent(audioPath)}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomNumber = searchParams.get('room');
    const cookieStore = await cookies();
    const staffId = cookieStore.get("staff_Id")?.value;
    
    if (!roomNumber || !staffId) {
      return NextResponse.json(
        { error: 'Room number and staff ID are required' },
        { status: 400 }
      );
    }

    const demoContext = await getCurrentDemoContext(cookieStore);
    const centerId = await getCurrentCenterId(cookieStore);

    // In demo mode query by sessionId + room so all session recordings for this
    // room are visible regardless of which nurse is shown on the desktop screen.
    let whereClause: object
    if (demoContext.sessionId) {
      whereClause = {
        sessionId: demoContext.sessionId,
        is_approved: 0,
        bed_info: {
          room_info: { room_number: parseInt(roomNumber, 10) },
        },
      }
    } else {
      const user = await prisma.user_info.findFirst({
        where: {
          staff_id: staffId,
          ...(centerId ? { center_id: centerId } : {}),
        },
        select: { user_id: true, center_id: true },
      });
      if (!user) return NextResponse.json([]);
      whereClause = {
        is_approved: 0,
        bed_info: {
          assigned_nurse_id: user.user_id,
          room_info: {
            room_number: parseInt(roomNumber, 10),
            center_id: centerId ?? user.center_id,
          },
        },
      }
    }

    const transcriptions = await prisma.room_data.findMany({
      where: whereClause,
      select: {
        id: true,
        patient_note: true,
        noteRecordingId: true,
        roomRecordingId: true,
        noteRecording: {
          select: {
            audioPath: true,
            transcript: true,
            createdAt: true,
          },
        },
        roomRecording: {
          select: {
            transcript: true,
          },
        },
        bed_info: {
          select: {
            bed_letter: true,
            room_info: {
              select: {
                room_number: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'desc' },
    });

    const rawRows = transcriptions.map((item) => {
      const recordedAt = item.noteRecording?.createdAt
      const dateStr = recordedAt
        ? new Date(recordedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '—'
      const timeStr = recordedAt
        ? new Date(recordedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        : '—'

      return {
        id: item.id,
        bedLetter: item.bed_info.bed_letter,
        noteRecordingId: item.noteRecordingId,
        roomRecordingId: item.roomRecordingId,
        audioUrl: item.noteRecording?.audioPath ? audioPathToUrl(item.noteRecording.audioPath) : null,
        column1:
          item.roomRecording?.transcript?.trim() ||
          `${item.bed_info.room_info.room_number} ${item.bed_info.bed_letter}`,
        column2: dateStr,
        column3: timeStr,
        column4:
          (item.patient_note?.trim()
            ? item.patient_note
            : item.noteRecording?.transcript || item.patient_note || null) || null,
      }
    })

    // Only return rows that have a completed patient note.
    const data = rawRows
      .filter((row) => row.column4 && row.column4.trim() !== '')
      .map((row, index) => ({ ...row, index: index + 1 }))

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching transcriptions by room:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    );
  }
} 
