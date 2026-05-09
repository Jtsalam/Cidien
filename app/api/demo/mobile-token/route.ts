import { NextResponse } from "next/server";
import { getCurrentDemoContext } from "@/lib/demo";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const demoContext = await getCurrentDemoContext();
    if (!demoContext.centerId || !demoContext.sessionId) {
      return NextResponse.json({ error: "Demo session not found." }, { status: 401 });
    }

    // Role: Pick the first nurse in the demo hospital that has at least one assigned bed.
    const nurse = await prisma.user_info.findFirst({
      where: {
        center_id: demoContext.centerId,
        user_role: "Staff",
        bed_info: { some: {} },
      },
      orderBy: { user_id: "asc" },
      select: { staff_id: true, user_name: true },
    });

    if (!nurse) {
      return NextResponse.json(
        { error: "No nurse with assigned beds found in this demo hospital." },
        { status: 404 },
      );
    }

    const hospital = await prisma.medicalcenter_info.findUnique({
      where: { center_id: demoContext.centerId },
      select: { center_name: true },
    });

    return NextResponse.json({
      sessionId: demoContext.sessionId,
      staffId: nurse.staff_id,
      staffName: nurse.user_name,
      hospitalName: hospital?.center_name ?? "",
      centerId: demoContext.centerId,
    });
  } catch (error) {
    console.error("mobile-token error:", error);
    return NextResponse.json({ error: "Unable to generate mobile token." }, { status: 500 });
  }
}
