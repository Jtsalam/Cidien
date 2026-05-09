import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import prisma from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabaseServer";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { recordingId } = await req.json();

    const recording = await prisma.recording.findUnique({
      where: { id: recordingId },
    });

    if (!recording) {
      return NextResponse.json({ error: "Recording not found" }, { status: 404 });
    }

    // Download from Supabase
    const { data: audioBlob, error: downloadError } =
      await supabaseServer.storage
        .from("audio-recordings")
        .download(recording.audioPath);

    if (!audioBlob || downloadError) {
      return NextResponse.json({ error: "Failed to download audio" }, { status: 500 });
    }

    const buffer = Buffer.from(await audioBlob.arrayBuffer());

    const audioFile = new File([buffer], "audio.webm", {
      type: "audio/webm",
    });

    // Different prompts depending on type
    const prompt =
      recording.type === "ROOM"
        ? "Transcribe clearly. This audio contains only a hospital room number and bed number. Output format: Room <number>, Bed <number>."
        : "The following audio is a medical note taken by a nurse for a patient. Transcribe professionally and clearly.";

    const transcriptText = await client.audio.transcriptions.create({
      model: "gpt-4o-mini-transcribe",
      file: audioFile,
      response_format: "text",
      prompt,
    });

    // Save transcript
    await prisma.recording.update({
      where: { id: recordingId },
      data: { transcript: transcriptText },
    });

    return NextResponse.json({
      success: true,
      transcript: transcriptText,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}