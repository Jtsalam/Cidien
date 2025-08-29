//app/api/staff/transcriptions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const staffId = cookieStore.get('staff_Id')?.value

    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID not found in cookies' },
        { status: 401 }
      )
    }

    // Find the user to get their center_id
    const user = await prisma.user_info.findFirst({
      where: { staff_id: staffId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    // Get transcriptions from the database
    const transcriptions = await prisma.patient_uploads.findMany({
      include: {
        patient_info: {
          include: {
            medicalcenter_info: true
          }
        }
      },
      where: {
        patient_info: {
          center_id: user.center_id
        }
      },
      orderBy: {
        upload_time: 'desc'
      }
    })

    // Format the data to match the expected structure
    const formattedData = transcriptions.map(upload => ({
      patient_id: upload.patient_id,
      session_id: upload.session_id,
      audioUrl: upload.upload_path,
      column1: `${upload.patient_info.medicalcenter_info.center_name}`, // Date will be added by frontend
      column2: upload.upload_time.toISOString(), // Time
      column3: upload.patient_info.patient_name, // Patient Info
      column4: upload.patient_notes, // Patient Note
      is_approved: upload.is_approved
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    )
  }
}

