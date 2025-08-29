//app/api/staff/transcriptions-by-room/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomNumber = searchParams.get('room');
    const cookieStore = await cookies();
    const staffId = cookieStore.get("staff_Id")?.value;
    
    if (!roomNumber || !staffId) {
      return NextResponse.json(
        { error: 'Room number and staff ID are required' },
        { status: 400 }
      );
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

    // Get transcriptions for specific room from the database
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
        },
        // Filter by room - this might need adjustment based on how room info is stored
        upload_path: {
          contains: roomNumber
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
      column1: `${roomNumber} ${new Date().toLocaleDateString()}`, // Room and Date
      column2: upload.upload_time.toISOString(), // Time
      column3: upload.patient_info.patient_name, // Patient Info
      column4: upload.patient_notes, // Patient Note
      is_approved: upload.is_approved
    }))

    return NextResponse.json(formattedData)

  } catch (error) {
    console.error('Error fetching transcriptions by room:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    );
  }
} 