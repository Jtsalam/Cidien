import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nurseId = searchParams.get('nurseId'); // staff_id (string)
  const room = searchParams.get('room'); // room_number (string)

  if (!nurseId) {
    return NextResponse.json({ error: 'Missing nurseId' }, { status: 400 });
  }

  // Find the nurse's user_id from staff_id (staff_id is not unique, so use findFirst)
  const nurse = await prisma.user_info.findFirst({
    where: { staff_id: nurseId },
    select: { user_id: true },
  });
  if (!nurse) {
    return NextResponse.json({ rooms: [] });
  }

  // Find all beds assigned to this nurse
  const beds = await prisma.bed_info.findMany({
    where: {
      assigned_nurse_id: nurse.user_id,
      ...(room ? { room_info: { room_number: parseInt(room, 10) } } : {}),
    },
    select: {
      bed_letter: true,
      room_info: {
        select: { room_number: true },
      },
      patient_info: {
        select: { patient_name: true },
      },
    },
  });

  // Group by room_number
  const roomMap: Record<string, { room_number: string; beds: { bed_letter: string; patient_name?: string }[] }> = {};
  for (const bed of beds) {
    const roomNum = String(bed.room_info.room_number);
    if (!roomMap[roomNum]) {
      roomMap[roomNum] = { room_number: roomNum, beds: [] };
    }
    roomMap[roomNum].beds.push({
      bed_letter: bed.bed_letter,
      patient_name: bed.patient_info?.patient_name || 'Unassigned',
    });
  }

  const rooms = Object.values(roomMap);
  return NextResponse.json({ rooms });
}
