import { NextResponse } from "next/server";
import { createDemoSession, DEMO_SESSION_MAX_AGE_SECONDS } from "@/lib/demo-session";

export async function POST() {
  try {
    const demo = await createDemoSession();
    const response = NextResponse.json({
      success: true,
      redirectUrl: "/dashboard",
      centerName: demo.centerName,
      sessionId: demo.sessionId,
    });

    const cookieOptions = {
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax" as const,
    };

    response.cookies.set("organization", "DEMO", cookieOptions);
    response.cookies.set("demo_org_name", demo.centerName, cookieOptions);
    response.cookies.set("demo_session_id", demo.sessionId, cookieOptions);
    response.cookies.set("demo_center_id", String(demo.centerId), cookieOptions);
    response.cookies.set("staffSubmitted", "true", cookieOptions);
    response.cookies.set("user_role", demo.userRole, cookieOptions);
    response.cookies.set("staff_Id", demo.staffId, cookieOptions);

    return response;
  } catch (error) {
    console.error("Error starting demo session:", error);
    return NextResponse.json(
      { error: "Unable to start demo session." },
      { status: 500 },
    );
  }
}
