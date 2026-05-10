import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentCenterId } from "@/lib/demo";
import { prisma } from "@/lib/prisma";

// Role: Ensure both tables are in the supabase_realtime publication so that
// postgres_changes subscriptions on the client actually receive events.
// ADD TABLE is idempotent — if the table is already in the publication it errors
// silently, which we swallow. Runs once per server-start (cached by module scope).
let realtimePublicationReady = false;
async function ensureRealtimePublication() {
  if (realtimePublicationReady) return;
  try {
    await prisma.$executeRaw`ALTER PUBLICATION supabase_realtime ADD TABLE room_data`;
  } catch { /* already in publication */ }
  try {
    await prisma.$executeRaw`ALTER PUBLICATION supabase_realtime ADD TABLE "Recording"`;
  } catch { /* already in publication */ }
  // REPLICA IDENTITY FULL makes Supabase include all columns in UPDATE payloads,
  // not just the primary key. Without this payload.new only has the PK.
  try {
    await prisma.$executeRaw`ALTER TABLE room_data REPLICA IDENTITY FULL`;
  } catch { /* ignore */ }
  try {
    await prisma.$executeRaw`ALTER TABLE "Recording" REPLICA IDENTITY FULL`;
  } catch { /* ignore */ }
  realtimePublicationReady = true;
  console.log("[session-id] realtime publication + REPLICA IDENTITY FULL ensured");
}

export async function GET() {
  void ensureRealtimePublication();
  try {
    const cookieStore = await cookies();
    const fromCookie = cookieStore.get("demo_session_id")?.value;
    if (fromCookie) {
      const valid = await prisma.demo_session.findFirst({
        where: { session_id: fromCookie, expires_at: { gt: new Date() } },
        select: { session_id: true },
      });
      if (valid) {
        return NextResponse.json({ sessionId: valid.session_id });
      }
    }

    const centerId = await getCurrentCenterId(cookieStore);
    if (!centerId) {
      return NextResponse.json({ sessionId: null });
    }

    const demoSession = await prisma.demo_session.findFirst({
      where: {
        center_id: centerId,
        expires_at: { gt: new Date() },
      },
      orderBy: { created_at: "desc" },
      select: { session_id: true },
    });

    return NextResponse.json({ sessionId: demoSession?.session_id ?? null });
  } catch (error) {
    console.error("session-id route error:", error);
    return NextResponse.json({ sessionId: null }, { status: 500 });
  }
}
