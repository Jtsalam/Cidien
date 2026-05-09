import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "ROOM" | "NOTE"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (type !== "ROOM" && type !== "NOTE") {
      return NextResponse.json({ error: "Invalid recording type" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop() || "webm";
    const fileName = `${type.toLowerCase()}-${crypto.randomUUID()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseServer.storage
      .from("audio-recordings")
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Create DB row
    const recording = await prisma.recording.create({
      data: {
        audioPath: data.path,
        type: type, // ROOM or NOTE
      },
    });

    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      audioPath: recording.audioPath,
      type: recording.type,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}