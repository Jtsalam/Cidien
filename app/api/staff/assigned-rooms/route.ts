import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { getCurrentCenterId } from '@/lib/demo';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get("staff_Id")?.value;
    
    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID not found in cookies' },
        { status: 401 }
      );
    }

    const centerId = await getCurrentCenterId(cookieStore);
    const nurse = await prisma.user_info.findFirst({
      where: {
        staff_id: staffId,
        ...(centerId ? { center_id: centerId } : {}),
      },
      select: { user_id: true },
    });

    if (!nurse) {
      return NextResponse.json({ rooms: [] });
    }

    const beds = await prisma.bed_info.findMany({
      where: { assigned_nurse_id: nurse.user_id },
      select: {
        room_info: {
          select: {
            room_number: true,
            center_id: true,
          },
        },
      },
      orderBy: {
        room_info: {
          room_number: 'asc',
        },
      },
    });

    const rooms = Array.from(
      new Set(
        beds
          .filter((bed) => !centerId || bed.room_info.center_id === centerId)
          .map((bed) => String(bed.room_info.room_number)),
      ),
    );

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error('Error fetching assigned rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assigned rooms' },
      { status: 500 }
    );
  }
}
