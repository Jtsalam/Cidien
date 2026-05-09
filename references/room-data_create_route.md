import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { bed_id, roomRecordingId, noteRecordingId } = await req.json();

    const roomData = await prisma.room_data.create({
      data: {
        bed_id,
        roomRecordingId,
        noteRecordingId,
        patient_note: "", // optional if you still want it
      },
    });

    return NextResponse.json({
      success: true,
      roomData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create room data" }, { status: 500 });
  }
}