import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET handler
export async function GET(
  req: NextRequest,
  context: { params: { bedId: string } }
) {
  const bedId = parseInt(context.params.bedId);
  if (isNaN(bedId)) {
    return NextResponse.json({ error: "Invalid bed ID" }, { status: 400 });
  }

  try {
    const bed = await prisma.bed_info.findUnique({
      where: { bed_id: bedId },
      include: {
        patient_info: true,
        user_info: true,
      },
    });

    if (!bed) {
      return NextResponse.json({ error: "Bed not found" }, { status: 404 });
    }

    return NextResponse.json(bed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bed data" }, { status: 500 });
  }
}

// PATCH handler
export async function PATCH(
  req: NextRequest,
  context: { params: { bedId: string } }
) {
  const bedId = parseInt(context.params.bedId);
  if (isNaN(bedId)) {
    return NextResponse.json({ error: "Invalid bed ID" }, { status: 400 });
  }

  const body = await req.json();
  const { patientName, patientId, nurseId, roomId, assignToAllBeds } = body;

  try {
    // Update patient name if provided
    if (patientId && patientName) {
      await prisma.patient_info.update({
        where: { patient_id: patientId },
        data: { patient_name: patientName },
      });
    }

    // Assign nurse to all beds in the room if required
    if (assignToAllBeds && nurseId && roomId) {
      await prisma.bed_info.updateMany({
        where: { room_id: roomId },
        data: { assigned_nurse_id: nurseId },
      });
    }

    // Assign patient to the specific bed
    await prisma.bed_info.update({
      where: { bed_id: bedId },
      data: { assigned_patient_id: patientId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update bed assignment" }, { status: 500 });
  }
}