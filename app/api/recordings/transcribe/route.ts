import { NextResponse } from "next/server";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  AUDIO_RECORDINGS_BUCKET,
  supabaseServer,
} from "@/lib/supabaseServer";

const OPENAI_TRANSCRIBE_URL = "https://api.openai.com/v1/audio/transcriptions";

function promptForType(type: RecordingType) {
  if (type === RecordingType.ROOM) {
    return "This audio contains a hospital room and bed identifier. Return only plain text in this exact pattern: Room <room_number> Bed <bed_letter>.";
  }

  return "This audio is a nurse bedside note. Transcribe clearly and completely in plain text, preserving medically relevant details.";
}

export async function POST(req: Request) {
  try {
    const { recordingId } = (await req.json()) as { recordingId?: string };
    console.log(`[transcribe] received recordingId=${recordingId}`);

    if (!recordingId) {
      return NextResponse.json({ error: "recordingId is required" }, { status: 400 });
    }

    const recording = await prisma.recording.findUnique({
      where: { id: recordingId },
      select: { id: true, audioPath: true, type: true },
    });

    if (!recording) {
      console.error("[transcribe] recording not found:", recordingId);
      return NextResponse.json({ error: "Recording not found" }, { status: 404 });
    }

    console.log(`[transcribe] type=${recording.type} path=${recording.audioPath} — downloading audio...`);

    const { data: audioBlob, error: downloadError } = await supabaseServer.storage
      .from(AUDIO_RECORDINGS_BUCKET)
      .download(recording.audioPath);

    if (downloadError || !audioBlob) {
      console.error("[transcribe] download failed:", downloadError?.message);
      return NextResponse.json({ error: "Failed to download audio" }, { status: 500 });
    }

    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    console.log(`[transcribe] audio downloaded — ${buffer.byteLength}B — sending to OpenAI...`);

    const file = new File(
      [buffer],
      `${recording.type.toLowerCase()}.webm`,
      { type: "audio/webm" },
    );

    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      console.error("[transcribe] OPENAI_API_KEY is not set");
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const form = new FormData();
    form.append("model", "gpt-4o-mini-transcribe");
    form.append("file", file);
    form.append("response_format", "text");
    form.append("prompt", promptForType(recording.type));

    const openAiRes = await fetch(OPENAI_TRANSCRIBE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${openAiApiKey}` },
      body: form,
    });

    if (!openAiRes.ok) {
      const details = await openAiRes.text();
      console.error("[transcribe] OpenAI error:", details);
      return NextResponse.json({ error: "Transcription provider failed" }, { status: 502 });
    }

    const transcript = (await openAiRes.text()).trim();
    console.log(`[transcribe] ✓ OpenAI transcript: "${transcript}"`);

    await prisma.recording.update({
      where: { id: recording.id },
      data: { transcript },
    });

    if (recording.type === RecordingType.NOTE) {
      await prisma.room_data.updateMany({
        where: { noteRecordingId: recording.id },
        data: { patient_note: transcript },
      });
      console.log(`[transcribe] ✓ patient_note updated for noteRecordingId=${recording.id}`);
    }

    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      type: recording.type,
      transcript,
    });
  } catch (error) {
    console.error("[transcribe] unexpected error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}