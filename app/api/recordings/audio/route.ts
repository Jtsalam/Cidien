import { NextRequest, NextResponse } from "next/server";
import { AUDIO_RECORDINGS_BUCKET, supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  try {
    // Role: Stream audio bytes from Supabase Storage to the browser.
    const objectPath = request.nextUrl.searchParams.get("path");
    if (!objectPath) {
      return NextResponse.json({ error: "Missing path query parameter" }, { status: 400 });
    }

    const { data, error } = await supabaseServer.storage
      .from(AUDIO_RECORDINGS_BUCKET)
      .download(objectPath);

    if (error || !data) {
      return NextResponse.json({ error: "Audio not found" }, { status: 404 });
    }

    const contentType = data.type || "audio/webm";
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    console.error("Recording audio proxy error:", error);
    return NextResponse.json({ error: "Failed to load audio" }, { status: 500 });
  }
}
