import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCurrentDemoContext } from '@/lib/demo';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get('staff_Id')?.value;
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found in cookies' }, { status: 401 });
    }
    const body = await request.json();
    const { room, bed } = body;
    const demoContext = await getCurrentDemoContext(cookieStore);

    if (demoContext.centerId) {
      const user = await prisma.user_info.findFirst({
        where: {
          staff_id: staffId,
          center_id: demoContext.centerId,
        },
        select: { user_id: true },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const result = await prisma.room_data.updateMany({
        where: {
          bed_info: {
            assigned_nurse_id: user.user_id,
            ...(bed && bed !== 'ALL' ? { bed_letter: bed } : {}),
            room_info: {
              center_id: demoContext.centerId,
              ...(room ? { room_number: parseInt(room, 10) } : {}),
            },
          },
        },
        data: { is_approved: 1 },
      });

      return NextResponse.json({
        success: true,
        updated: result.count,
        pdfs_generated: 0,
        message: 'Demo notes approved.',
      });
    }

    // Proxy to Flask backend
    const response = await fetch('http://localhost:5000/staff/approve-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staff_id: staffId, room, bed}),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error approving notes:', error);
    return NextResponse.json({ error: 'Failed to approve notes' }, { status: 500 });
  }
}

