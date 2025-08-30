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
    const formattedData = transcriptions.map(upload => {
      // Handle invalid or null upload_time by using current date
      const date = upload.upload_time && !isNaN(new Date(upload.upload_time).getTime()) 
        ? new Date(upload.upload_time) 
        : new Date()
        
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      const formattedTime = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })
      
      return {
        patient_id: upload.patient_id,
        session_id: upload.session_id,
        audioUrl: upload.upload_path,
        column1: upload.patient_info.patient_name || 'Unknown Room', // Room/Patient info
        column2: formattedDate, // Formatted date
        column3: formattedTime, // Formatted time
        column4: upload.patient_notes, // Patient Note
        is_approved: upload.is_approved
      }
    })

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    )
  }
}

