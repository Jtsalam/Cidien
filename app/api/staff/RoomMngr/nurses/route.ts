import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust if your Prisma client path is different

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const centerIdParam = searchParams.get('centerId');
  const search = searchParams.get('search') || '';

  const centerId = parseInt(centerIdParam || '', 10);
  if (!centerId || isNaN(centerId)) {
    return NextResponse.json({ error: 'Invalid or missing centerId' }, { status: 400 });
  }

  try {
    const nurses = await prisma.user_info.findMany({
      where: {
        center_id: centerId,
        user_name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      select: {
        user_id: true,
        user_name: true,
      },
      orderBy: {
        user_name: 'asc',
      },
    });

    return NextResponse.json({ nurses });
  } catch (error) {
    console.error('Error fetching nurses:', error);
    return NextResponse.json({ error: 'Failed to fetch nurses' }, { status: 500 });
  }
}