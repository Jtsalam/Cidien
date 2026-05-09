import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentCenterId } from "@/lib/demo";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
