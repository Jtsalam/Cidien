import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    console.log('Approve API called with ID:', id)

    // Handle new transcriptions that start with "new_transcription"
    if (id.startsWith('new_transcription')) {
      // For new transcriptions, we need to create the database record first
      const { patient_id, session_id, upload_path, patient_notes, upload_time } = body

      if (!patient_id || !session_id) {
        return NextResponse.json({ error: 'Missing required data for new transcription' }, { status: 400 })
      }

      // Get any existing patient from JPCH to use as a valid foreign key
      const existingPatient = await prisma.patient_info.findFirst({
        where: {
          medicalcenter_info: {
            center_name: "Jim Pattison Children's Hospital"
          }
        }
      })

      if (!existingPatient) {
        return NextResponse.json({ error: 'No valid patient found' }, { status: 400 })
      }

      console.log('Using patient ID:', existingPatient.patient_id)

      // Create the transcription record as approved
      const created = await prisma.patient_uploads.create({
        data: {
          patient_id: existingPatient.patient_id,
          session_id: parseInt(session_id),
          upload_path: upload_path || '',
          patient_notes: patient_notes || '',
          upload_time: upload_time ? new Date(upload_time) : new Date(),
          is_approved: true
        }
      })

      console.log('Created new transcription:', created)
      return NextResponse.json(created)
    }

    // Handle existing transcriptions
    const [patient_id_str, session_id_str] = id.split('_')
    const patient_id = parseInt(patient_id_str)
    const session_id = parseInt(session_id_str)

    if (isNaN(patient_id) || isNaN(session_id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const updated = await prisma.patient_uploads.update({
      where: { patient_id_session_id: { patient_id, session_id } },
      data: { is_approved: true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Approve error:', error)
    return NextResponse.json({ error: 'Failed to approve note' }, { status: 500 })
  }
}
