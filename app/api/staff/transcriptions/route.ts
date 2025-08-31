//app/api/staff/transcriptions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

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

    // Get transcriptions from patient_uploads table (the source of truth for transcriptions)
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

    // Get room_data to match audio files with room/bed information
    const roomDataEntries = await prisma.room_data.findMany({
      include: {
        bed_info: {
          include: {
            room_info: true,
            user_info: true
          }
        }
      },
      where: {
        bed_info: {
          user_info: {
            center_id: user.center_id
          }
        }
      }
    })

    // Format the data to match the expected structure, using transcriptions as primary source
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
      
      // Find corresponding room_data to get room and bed info
      const uploadFileName = upload.upload_path.split('/').pop() || upload.upload_path
      const matchingRoomData = roomDataEntries.find(roomData => {
        const audioFileName = roomData.audio_path.split('/').pop() || roomData.audio_path
        
        // Try multiple matching strategies
        if (audioFileName === uploadFileName) return true
        if (roomData.audio_path.includes(uploadFileName)) return true
        if (upload.upload_path.includes(audioFileName)) return true
        
        // Check without extensions
        const audioNameNoExt = audioFileName.replace(/\.(wav|webm|mp3|m4a)$/i, '')
        const uploadNameNoExt = uploadFileName.replace(/\.(wav|webm|mp3|m4a)$/i, '')
        if (audioNameNoExt === uploadNameNoExt) return true
        
        return false
      })
      
      // Use room info if available, otherwise fallback to patient info
      const roomInfo = matchingRoomData 
        ? `${matchingRoomData.bed_info.room_info.room_number} ${matchingRoomData.bed_info.bed_letter}`
        : upload.patient_info.patient_name || 'Unknown Room'
      
      console.log(`Upload ID: ${upload.patient_id}_${upload.session_id}, Room Match: ${roomInfo}, Upload: ${uploadFileName}`)
      
      return {
        patient_id: upload.patient_id,
        session_id: upload.session_id,
        audioUrl: `/audio/${uploadFileName}`,
        column1: roomInfo,
        column2: formattedDate,
        column3: formattedTime,
        column4: upload.patient_notes,
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

