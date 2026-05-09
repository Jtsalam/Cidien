import { NextResponse } from "next/server";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AUDIO_RECORDINGS_BUCKET, supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    // Role: Parse and validate upload inputs for a ROOM/NOTE recording.
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (type !== RecordingType.ROOM && type !== RecordingType.NOTE) {
      return NextResponse.json(
        { error: "Invalid recording type. Expected ROOM or NOTE." },
        { status: 400 },
      );
    }

    // Role: Upload the binary audio to Supabase storage for durable retrieval.
    const extension = file.name.split(".").pop() ?? "webm";
    const objectPath = `${type.toLowerCase()}-${crypto.randomUUID()}.${extension}`;
    const { data, error } = await supabaseServer.storage
      .from(AUDIO_RECORDINGS_BUCKET)
      .upload(objectPath, file, {
        contentType: file.type || "audio/webm",
        upsert: false,
      });

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message ?? "Failed to upload recording" },
        { status: 500 },
      );
    }

    // Role: Persist the storage path and recording type in Postgres.
    const recording = await prisma.recording.create({
      data: {
        audioPath: data.path,
        type,
      },
      select: {
        id: true,
        audioPath: true,
        type: true,
      },
    });

    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      audioPath: recording.audioPath,
      type: recording.type,
    });
  } catch (error) {
    console.error("Upload recording error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
