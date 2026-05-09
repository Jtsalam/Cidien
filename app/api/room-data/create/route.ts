import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getCurrentCenterId } from "@/lib/demo";

async function resolveSessionId() {
  // Role: Resolve a valid demo session ID required by the room_data foreign key.
  const cookieStore = await cookies();
  const sessionIdFromCookie = cookieStore.get("demo_session_id")?.value;
  if (sessionIdFromCookie) return sessionIdFromCookie;

  const centerId = await getCurrentCenterId(cookieStore);
  if (!centerId) return null;

  const demoSession = await prisma.demo_session.findFirst({
    where: {
      center_id: centerId,
      expires_at: { gt: new Date() },
    },
    orderBy: { created_at: "desc" },
    select: { session_id: true },
  });

  return demoSession?.session_id ?? null;
}

export async function POST(req: Request) {
  try {
    // Role: Validate linkage payload and load both recording rows.
    const payload = (await req.json()) as {
      bed_id?: number;
      roomRecordingId?: string;
      noteRecordingId?: string;
    };

    if (!payload.bed_id || !payload.roomRecordingId || !payload.noteRecordingId) {
      return NextResponse.json(
        { error: "bed_id, roomRecordingId, and noteRecordingId are required" },
        { status: 400 },
      );
    }

    const [roomRecording, noteRecording, bed] = await Promise.all([
      prisma.recording.findUnique({
        where: { id: payload.roomRecordingId },
        select: { id: true, type: true, transcript: true },
      }),
      prisma.recording.findUnique({
        where: { id: payload.noteRecordingId },
        select: { id: true, type: true, transcript: true },
      }),
      prisma.bed_info.findUnique({
        where: { bed_id: payload.bed_id },
        select: { bed_id: true },
      }),
    ]);

    if (!bed) {
      return NextResponse.json({ error: "bed_id does not exist" }, { status: 404 });
    }

    if (!roomRecording || roomRecording.type !== RecordingType.ROOM) {
      return NextResponse.json(
        { error: "roomRecordingId must reference a ROOM recording" },
        { status: 400 },
      );
    }

    if (!noteRecording || noteRecording.type !== RecordingType.NOTE) {
      return NextResponse.json(
        { error: "noteRecordingId must reference a NOTE recording" },
        { status: 400 },
      );
    }

    const sessionId = await resolveSessionId();
    if (!sessionId) {
      return NextResponse.json(
        { error: "No valid demo session found for room_data creation" },
        { status: 400 },
      );
    }

    // Role: Create room_data row that links both recordings and stores transcribed note text.
    const roomData = await prisma.room_data.create({
      data: {
        bed_id: payload.bed_id,
        sessionId,
        roomRecordingId: roomRecording.id,
        noteRecordingId: noteRecording.id,
        patient_note: noteRecording.transcript ?? "",
      },
      select: {
        id: true,
        bed_id: true,
        roomRecordingId: true,
        noteRecordingId: true,
      },
    });

    return NextResponse.json({ success: true, roomData });
  } catch (error) {
    console.error("Create room_data error:", error);
    return NextResponse.json({ error: "Failed to create room_data" }, { status: 500 });
  }
}
