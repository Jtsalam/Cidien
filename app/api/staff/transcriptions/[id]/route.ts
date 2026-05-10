import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getCurrentCenterId, getCurrentDemoContext } from "@/lib/demo";

async function assertCanAccessRoomData(
  id: number,
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const staffId = cookieStore.get("staff_Id")?.value;
  if (!staffId) {
    return { ok: false, status: 401, message: "Staff ID not found in cookies" };
  }

  const demoContext = await getCurrentDemoContext(cookieStore);
  const centerId = await getCurrentCenterId(cookieStore);

  if (demoContext.sessionId && demoContext.centerId) {
    const record = await prisma.room_data.findFirst({
      where: {
        id,
        sessionId: demoContext.sessionId,
        bed_info: { room_info: { center_id: demoContext.centerId } },
      },
      select: { id: true },
    });
    if (!record) return { ok: false, status: 404, message: "Record not found." };
    return { ok: true };
  }

  const user = await prisma.user_info.findFirst({
    where: {
      staff_id: staffId,
      ...(centerId ? { center_id: centerId } : {}),
    },
    select: { user_id: true, center_id: true },
  });
  if (!user) return { ok: false, status: 404, message: "Record not found." };

  const record = await prisma.room_data.findFirst({
    where: {
      id,
      bed_info: {
        assigned_nurse_id: user.user_id,
        room_info: { center_id: centerId ?? user.center_id },
      },
    },
    select: { id: true },
  });
  if (!record) return { ok: false, status: 404, message: "Record not found." };
  return { ok: true };
}

// PATCH /api/staff/transcriptions/[id] - Update a patient note
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
    }
    const { patient_note } = await request.json();
    if (typeof patient_note !== "string") {
      return NextResponse.json({ error: "Invalid patient note provided." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const gate = await assertCanAccessRoomData(id, cookieStore);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.message }, { status: gate.status });
    }

    const updatedRecord = await prisma.room_data.update({
      where: { id },
      data: { patient_note },
    });
    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (error) {
    console.error("Error updating transcription:", error);
    return NextResponse.json({ error: "Failed to update transcription." }, { status: 500 });
  }
}

// DELETE /api/staff/transcriptions/[id] - Delete a transcription entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const gate = await assertCanAccessRoomData(id, cookieStore);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.message }, { status: gate.status });
    }

    await prisma.room_data.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting transcription:", error);
    return NextResponse.json({ error: "Failed to delete transcription." }, { status: 500 });
  }
}
