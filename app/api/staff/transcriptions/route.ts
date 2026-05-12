import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCurrentCenterId, getCurrentDemoContext } from '@/lib/demo'
import { prisma } from '@/lib/prisma'

function audioPathToUrl(audioPath: string) {
  // Role: Build a storage proxy URL from Supabase object path.
  return `/api/recordings/audio?path=${encodeURIComponent(audioPath)}`;
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

    const demoContext = await getCurrentDemoContext(cookieStore)
    const centerId = await getCurrentCenterId(cookieStore)

    // In demo mode query by sessionId so the desktop sees all recordings from the
    // session regardless of which nurse is currently shown on the desktop screen.
    const whereClause = demoContext.sessionId
      ? { sessionId: demoContext.sessionId, is_approved: 0 }
      : (() => {
          // Non-demo: filter by the logged-in nurse's assigned beds.
          return {
            bed_info: {
              assigned_nurse_id: 0, // will be overwritten below
              room_info: { center_id: 0 },
            },
          }
        })()

    // For non-demo we still need the user row to get user_id.
    let nurseFilter: object | null = null
    if (!demoContext.sessionId) {
      const user = await prisma.user_info.findFirst({
        where: {
          staff_id: staffId,
          ...(centerId ? { center_id: centerId } : {}),
        },
        select: { user_id: true, center_id: true },
      })
      if (!user) return NextResponse.json([])
      nurseFilter = {
        is_approved: 0,
        bed_info: {
          assigned_nurse_id: user.user_id,
          room_info: { center_id: centerId ?? user.center_id },
        },
      }
    }

    const transcriptions = await prisma.room_data.findMany({
      where: demoContext.sessionId ? whereClause : (nurseFilter ?? {}),
      select: {
        id: true,
        patient_note: true,
        noteRecordingId: true,
        roomRecordingId: true,
        noteRecording: {
          select: {
            audioPath: true,
            transcript: true,
            createdAt: true,
          },
        },
        roomRecording: {
          select: {
            transcript: true,
          },
        },
        bed_info: {
          select: {
            bed_letter: true,
            room_info: {
              select: {
                room_number: true,
              },
            },
            patient_info: {
              select: {
                patient_name: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'desc' },
    })

    const rawRows = transcriptions.map((item) => {
      const recordedAt = item.noteRecording?.createdAt
      const dateStr = recordedAt
        ? new Date(recordedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '—'
      const timeStr = recordedAt
        ? new Date(recordedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        : '—'

      return {
        id: item.id,
        bedLetter: item.bed_info.bed_letter,
        roomNumber: item.bed_info.room_info.room_number,
        patientName: item.bed_info.patient_info?.patient_name ?? null,
        noteRecordingId: item.noteRecordingId,
        roomRecordingId: item.roomRecordingId,
        audioUrl: item.noteRecording?.audioPath ? audioPathToUrl(item.noteRecording.audioPath) : null,
        column1:
          item.roomRecording?.transcript?.trim() ||
          `${item.bed_info.room_info.room_number} ${item.bed_info.bed_letter}`,
        column2: dateStr,
        column3: timeStr,
        column4:
          (item.patient_note?.trim()
            ? item.patient_note
            : item.noteRecording?.transcript || item.patient_note || null) || null,
      }
    })

    // Only return rows that have a completed patient note — prevents the dashboard
    // from showing a partial row (date/time with empty note) while transcription
    // is still in-flight. The row will appear once Recording.transcript is set.
    const data = rawRows
      .filter((row) => row.column4 && row.column4.trim() !== '')
      .map((row, index) => ({ ...row, index: index + 1 }))

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    )
  }
}
