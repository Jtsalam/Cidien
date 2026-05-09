import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_SESSION_MAX_AGE_SECONDS } from "@/lib/demo-session";

export async function POST(req: Request) {
  try {
    const { sessionId, staffId } = (await req.json()) as {
      sessionId?: string;
      staffId?: string;
    };

    if (!sessionId || !staffId) {
      return NextResponse.json(
        { error: "sessionId and staffId are required." },
        { status: 400 },
      );
    }

    // Role: Confirm the demo session exists and is not expired.
    const session = await prisma.demo_session.findFirst({
      where: { session_id: sessionId, expires_at: { gt: new Date() } },
      select: { session_id: true, center_id: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Demo session is invalid or expired." },
        { status: 401 },
      );
    }

    // Role: Confirm the nurse belongs to the demo hospital in this session.
    const nurse = await prisma.user_info.findFirst({
      where: { staff_id: staffId, center_id: session.center_id },
      select: { staff_id: true, user_role: true },
    });

    if (!nurse) {
      return NextResponse.json(
        { error: "Staff member not found in this demo session." },
        { status: 401 },
      );
    }

    const hospital = await prisma.medicalcenter_info.findUnique({
      where: { center_id: session.center_id },
      select: { center_name: true },
    });

    // Role: Set the same cookies the normal sign-in flow would set so all recording APIs work.
    const response = NextResponse.json({ success: true });
    const cookieOptions = {
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax" as const,
    };

    response.cookies.set("staff_Id", nurse.staff_id, cookieOptions);
    response.cookies.set("user_role", nurse.user_role, cookieOptions);
    response.cookies.set("staffSubmitted", "true", cookieOptions);
    response.cookies.set("organization", "DEMO", cookieOptions);
    response.cookies.set("demo_session_id", session.session_id, cookieOptions);
    response.cookies.set("demo_center_id", String(session.center_id), cookieOptions);
    response.cookies.set("demo_org_name", hospital?.center_name ?? "", cookieOptions);

    return response;
  } catch (error) {
    console.error("bypass route error:", error);
    return NextResponse.json({ error: "Bypass failed." }, { status: 500 });
  }
}
