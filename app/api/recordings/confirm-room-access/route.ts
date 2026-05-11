import { NextResponse } from "next/server";
import { RecordingType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  demoLimitJsonBody,
  evaluateTranscriptionDemoLimit,
  incrementTranscriptionUsage,
  transcriptionUsageJson,
} from "@/lib/transcriptionDemoRateLimit";

/**
 * Charges one credit against the demo transcription cap on behalf of the green-button
 * flow, only after the client has confirmed that:
 *   - parseRoomBedFromTranscript produced a valid room+bed, and
 *   - resolveBedId returned an assigned bed for the staff member.
 *
 * This keeps "Room not heard properly" / "Room access denied" attempts free.
 */
export async function POST(req: Request) {
  try {
    const { recordingId } = (await req.json()) as { recordingId?: string };
    if (!recordingId) {
      return NextResponse.json({ error: "recordingId is required" }, { status: 400 });
    }

    const recording = await prisma.recording.findUnique({
      where: { id: recordingId },
      select: { id: true, type: true },
    });
    if (!recording) {
      return NextResponse.json({ error: "Recording not found" }, { status: 404 });
    }
    if (recording.type !== RecordingType.ROOM) {
      return NextResponse.json(
        { error: "Recording is not a ROOM recording" },
        { status: 400 },
      );
    }

    const limitDecision = await evaluateTranscriptionDemoLimit(req);
    if (limitDecision.limited) {
      return NextResponse.json(demoLimitJsonBody(limitDecision), {
        status: 429,
        headers: { "Retry-After": String(limitDecision.retryAfterSec) },
      });
    }

    const { total, windowStart } = await incrementTranscriptionUsage(limitDecision);
    console.log(
      `[confirm-room-access] ip=${limitDecision.ip} total=${total} recordingId=${recording.id}`,
    );

    return NextResponse.json({
      success: true,
      recordingId: recording.id,
      usage: transcriptionUsageJson(total, windowStart),
    });
  } catch (error) {
    console.error("[confirm-room-access] unexpected error:", error);
    return NextResponse.json({ error: "Confirm room access failed" }, { status: 500 });
  }
}
