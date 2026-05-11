import { NextResponse } from "next/server";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  demoLimitJsonBody,
  evaluateTranscriptionDemoLimit,
} from "@/lib/transcriptionDemoRateLimit";
import { AUDIO_RECORDINGS_BUCKET, supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    // Role: Parse and validate upload inputs for a ROOM/NOTE recording.
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type");

    console.log(`[upload] received type=${type} file=${file instanceof File ? `${file.name} ${file.size}B` : "missing"}`);

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (type !== RecordingType.ROOM && type !== RecordingType.NOTE) {
      return NextResponse.json(
        { error: "Invalid recording type. Expected ROOM or NOTE." },
        { status: 400 },
      );
    }

    // Role: NOTE uploads count against the demo limit on success, so reject here when
    // the user is already capped — avoids orphan audio in Storage for blocked notes.
    // ROOM uploads are always allowed: the room transcript is needed to verify access,
    // and the counter only ticks via /api/recordings/confirm-room-access on success.
    if (type === RecordingType.NOTE) {
      const limitDecision = await evaluateTranscriptionDemoLimit(req);
      if (limitDecision.limited) {
        return NextResponse.json(demoLimitJsonBody(limitDecision), {
          status: 429,
          headers: { "Retry-After": String(limitDecision.retryAfterSec) },
        });
      }
    }

    // Role: Ensure the storage bucket exists before uploading (creates it on first use).
    const { error: bucketError } = await supabaseServer.storage.createBucket(
      AUDIO_RECORDINGS_BUCKET,
      { public: false },
    );
    if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) {
      console.error("[upload] bucket ensure failed:", bucketError.message);
      return NextResponse.json({ error: "Storage bucket unavailable" }, { status: 500 });
    }

    // Role: Upload the binary audio to Supabase storage for durable retrieval.
    const extension = file.name.split(".").pop() ?? "webm";
    const objectPath = `${type.toLowerCase()}-${crypto.randomUUID()}.${extension}`;
    console.log(`[upload] uploading to bucket="${AUDIO_RECORDINGS_BUCKET}" path="${objectPath}"`);

    const { data, error } = await supabaseServer.storage
      .from(AUDIO_RECORDINGS_BUCKET)
      .upload(objectPath, file, {
        contentType: file.type || "audio/webm",
        upsert: false,
      });

    if (error || !data) {
      console.error("[upload] supabase storage error:", error?.message);
      return NextResponse.json(
        { error: error?.message ?? "Failed to upload recording" },
        { status: 500 },
      );
    }

    // Role: Persist the storage path and recording type in Postgres.
    const recording = await prisma.recording.create({
      data: { audioPath: data.path, type },
      select: { id: true, audioPath: true, type: true },
    });

    console.log(`[upload] ✓ recordingId=${recording.id} type=${recording.type} path=${recording.audioPath}`);
    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      audioPath: recording.audioPath,
      type: recording.type,
    });
  } catch (error) {
    console.error("[upload] unexpected error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
