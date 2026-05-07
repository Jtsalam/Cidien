import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCurrentCenterId } from '@/lib/demo'
import { prisma } from '@/lib/prisma'

function audioPathToUrl(audioPath: string) {
  const normalized = audioPath.replace(/\\/g, '/')
  const uploadsIndex = normalized.indexOf('/uploads/')

  if (uploadsIndex >= 0) return normalized.slice(uploadsIndex)
  if (normalized.startsWith('/')) return normalized

  return `/${normalized}`
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const staffId = cookieStore.get('staff_Id')?.value
    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID not found in cookies' },
        { status: 401 }
      )
    }

    const centerId = await getCurrentCenterId(cookieStore)
    const user = await prisma.user_info.findFirst({
      where: {
        staff_id: staffId,
        ...(centerId ? { center_id: centerId } : {}),
      },
      select: { user_id: true, center_id: true },
    })

    if (!user) {
      return NextResponse.json([])
    }

    const transcriptions = await prisma.room_data.findMany({
      where: {
        bed_info: {
          assigned_nurse_id: user.user_id,
          room_info: {
            center_id: centerId ?? user.center_id,
          },
        },
      },
      select: {
        id: true,
        audio_path: true,
        patient_note: true,
        bed_info: {
          select: {
            bed_letter: true,
            room_info: {
              select: {
                room_number: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'desc' },
    })

    const data = transcriptions.map((item, index) => ({
      index: index + 1,
      id: item.id,
      audioUrl: audioPathToUrl(item.audio_path),
      column1: `${item.bed_info.room_info.room_number} ${item.bed_info.bed_letter}`,
      column2: 'Demo data',
      column3: '-',
      column4: item.patient_note,
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    )
  }
}
