import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getCurrentDemoContext } from "@/lib/demo";
import {
  DEMO_SESSION_MAX_AGE_SECONDS,
  rotateDemoSessionHospital,
} from "@/lib/demo-session";

type StaffRoom = {
  roomNumber: number;
  beds: Array<{ bedLabel: string; patientName: string }>;
};

export async function GET() {
  // Role: Return step-1 hospital overview details for the current demo session.
  try {
    const demoContext = await getCurrentDemoContext();
    if (!demoContext.centerId) {
      return NextResponse.json({ error: "Demo session not found." }, { status: 401 });
    }

    const centerId = demoContext.centerId;
    const [hospital, admin, nurseCount, roomCount, staffMembers] = await Promise.all([
      prisma.medicalcenter_info.findUnique({
        where: { center_id: centerId },
        select: { center_name: true },
      }),
      prisma.user_info.findFirst({
        where: { center_id: centerId, user_role: "Admin" },
        select: { user_name: true, staff_id: true },
      }),
      prisma.user_info.count({
        where: { center_id: centerId, user_role: "Staff" },
      }),
      prisma.room_info.count({ where: { center_id: centerId } }),
      prisma.user_info.findMany({
        where: { center_id: centerId, user_role: "Staff" },
        take: 3,
        orderBy: { user_id: "asc" },
        select: {
          user_name: true,
          staff_id: true,
          bed_info: {
            select: {
              bed_letter: true,
              room_info: { select: { room_number: true } },
              patient_info: { select: { patient_name: true } },
            },
            orderBy: [{ room_id: "asc" }, { bed_letter: "asc" }],
          },
        },
      }),
    ]);

    if (!hospital) {
      return NextResponse.json({ error: "Hospital not found." }, { status: 404 });
    }

    const staff = staffMembers.map((member) => {
      const roomMap = new Map<number, StaffRoom>();

      for (const bed of member.bed_info) {
        const roomNumber = bed.room_info.room_number;
        if (!roomMap.has(roomNumber)) {
          roomMap.set(roomNumber, { roomNumber, beds: [] });
        }

        roomMap.get(roomNumber)?.beds.push({
          bedLabel: `Bed ${bed.bed_letter}`,
          patientName: bed.patient_info?.patient_name ?? "Unassigned patient",
        });
      }

      return {
        nurseName: member.user_name,
        staffId: member.staff_id,
        assignedRooms: Array.from(roomMap.values()).sort(
          (a, b) => a.roomNumber - b.roomNumber,
        ),
      };
    });

    return NextResponse.json({
      hospitalName: hospital.center_name,
      adminName: admin?.user_name ?? "N/A",
      adminId: admin?.staff_id ?? "N/A",
      nurseCount,
      roomCount,
      staff,
    });
  } catch (error) {
    console.error("Error loading demo hospital overview:", error);
    return NextResponse.json(
      { error: "Unable to load hospital overview." },
      { status: 500 },
    );
  }
}

export async function POST() {
  // Role: Randomize the hospital for the current demo session and update cookies.
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("demo_session_id")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "Demo session not found." }, { status: 401 });
    }

    const updated = await rotateDemoSessionHospital(sessionId);
    const response = NextResponse.json({
      success: true,
      centerName: updated.centerName,
      centerId: updated.centerId,
    });

    const cookieOptions = {
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax" as const,
    };

    response.cookies.set("demo_org_name", updated.centerName, cookieOptions);
    response.cookies.set("demo_center_id", String(updated.centerId), cookieOptions);
    response.cookies.set("staff_Id", updated.staffId, cookieOptions);
    response.cookies.set("user_role", updated.userRole, cookieOptions);

    return response;
  } catch (error) {
    console.error("Error changing demo hospital:", error);
    return NextResponse.json(
      { error: "Unable to change hospital." },
      { status: 500 },
    );
  }
}
