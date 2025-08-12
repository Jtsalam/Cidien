import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomNumberParam = searchParams.get('room')
    if (!roomNumberParam) {
      return NextResponse.json({ error: 'Room number is required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const staffId = cookieStore.get('staff_Id')?.value
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found' }, { status: 401 })
    }

    // Find the user by staff_id to get user_id and center_id
    const user = await prisma.user_info.findFirst({
      where: { staff_id: staffId },
      select: { user_id: true, center_id: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const roomNumber = parseInt(roomNumberParam, 10)
    if (Number.isNaN(roomNumber)) {
      return NextResponse.json({ error: 'Invalid room number' }, { status: 400 })
    }

    // Find the room by room_number and same center
    const room = await prisma.room_info.findFirst({
      where: { room_number: roomNumber, center_id: user.center_id },
      select: { room_id: true },
    })

    if (!room) {
      return NextResponse.json({ beds: [] })
    }

    // Find beds in that room assigned to this nurse
    const beds = await prisma.bed_info.findMany({
      where: {
        room_id: room.room_id,
        assigned_nurse_id: user.user_id,
      },
      select: { bed_letter: true },
      orderBy: { bed_letter: 'asc' },
    })

    const bedLetters = beds.map(b => b.bed_letter)
    return NextResponse.json({ beds: bedLetters })
  } catch (error) {
    console.error('Error fetching assigned beds:', error)
    return NextResponse.json({ error: 'Failed to fetch beds' }, { status: 500 })
  }
}

