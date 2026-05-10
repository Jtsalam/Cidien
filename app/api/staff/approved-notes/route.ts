import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getCurrentCenterId } from '@/lib/demo';

function formatCreatedDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatCreatedTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const bed = searchParams.get('bed');

  if (!room || !bed) {
    return NextResponse.json({ error: 'Room and bed are required' }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get('staff_Id')?.value;
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found in cookies' }, { status: 401 });
    }

    const centerId = await getCurrentCenterId(cookieStore);
    const user = await prisma.user_info.findFirst({
      where: {
        staff_id: staffId,
        ...(centerId ? { center_id: centerId } : {}),
      },
      select: { user_id: true, center_id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const roomNum = parseInt(room, 10);
    if (Number.isNaN(roomNum)) {
      return NextResponse.json({ error: 'Invalid room number' }, { status: 400 });
    }

    const exports = await prisma.approvalPdfExport.findMany({
      where: {
        userId: user.user_id,
        rows: {
          some: {
            room_data: {
              bed_info: {
                bed_letter: bed,
                room_info: {
                  room_number: roomNum,
                  center_id: centerId ?? user.center_id,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        displayName: true,
        createdAt: true,
      },
    });

    const archives = exports.map((row, index) => ({
      index: index + 1,
      exportId: row.id,
      created_date: formatCreatedDate(row.createdAt),
      created_time: formatCreatedTime(row.createdAt),
      displayName: row.displayName,
    }));

    return NextResponse.json({
      archives,
      hasExports: archives.length > 0,
    });
  } catch (error) {
    console.error('Error fetching approved notes:', error);
    return NextResponse.json({ error: 'Failed to fetch approved notes' }, { status: 500 });
  }
}
