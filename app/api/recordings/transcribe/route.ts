import { NextResponse } from "next/server";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AUDIO_RECORDINGS_BUCKET, supabaseServer } from "@/lib/supabaseServer";

const OPENAI_TRANSCRIBE_URL = "https://api.openai.com/v1/audio/transcriptions";

function promptForType(type: RecordingType) {
  // Role: Select a transcription prompt optimized for each recording intent.
  if (type === RecordingType.ROOM) {
    return "This audio contains a hospital room and bed identifier. Return only plain text in this exact pattern: Room <room_number> Bed <bed_letter>.";
  }

  return "This audio is a nurse bedside note. Transcribe clearly and completely in plain text, preserving medically relevant details.";
}

export async function POST(req: Request) {
  try {
    // Role: Validate request body and load the recording row to transcribe.
    const { recordingId } = (await req.json()) as { recordingId?: string };
    if (!recordingId) {
      return NextResponse.json({ error: "recordingId is required" }, { status: 400 });
    }

    const recording = await prisma.recording.findUnique({
      where: { id: recordingId },
      select: { id: true, audioPath: true, type: true },
    });

    if (!recording) {
      return NextResponse.json({ error: "Recording not found" }, { status: 404 });
    }

    // Role: Download uploaded audio bytes from Supabase for model inference.
    const { data: audioBlob, error: downloadError } = await supabaseServer.storage
      .from(AUDIO_RECORDINGS_BUCKET)
      .download(recording.audioPath);

    if (downloadError || !audioBlob) {
      return NextResponse.json({ error: "Failed to download audio" }, { status: 500 });
    }

    // Role: Call OpenAI transcription API with gpt-4o-mini-transcribe and type-specific prompt.
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const form = new FormData();
    form.append("model", "gpt-4o-mini-transcribe");
    form.append("file", audioBlob, `${recording.type.toLowerCase()}.webm`);
    form.append("response_format", "text");
    form.append("prompt", promptForType(recording.type));

    const openAiRes = await fetch(OPENAI_TRANSCRIBE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: form,
    });

    if (!openAiRes.ok) {
      const details = await openAiRes.text();
      console.error("OpenAI transcription error:", details);
      return NextResponse.json({ error: "Transcription provider failed" }, { status: 502 });
    }

    const transcript = (await openAiRes.text()).trim();

    // Role: Save the transcript back to the same recording row for downstream linkage.
    await prisma.recording.update({
      where: { id: recording.id },
      data: { transcript },
    });

    // Role: Mirror NOTE transcript into linked room_data rows for legacy table compatibility.
    if (recording.type === RecordingType.NOTE) {
      await prisma.room_data.updateMany({
        where: { noteRecordingId: recording.id },
        data: { patient_note: transcript },
      });
    }

    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      type: recording.type,
      transcript,
    });
  } catch (error) {
    console.error("Transcribe recording error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
