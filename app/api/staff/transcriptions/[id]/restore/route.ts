import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    console.log('Restore API called with ID:', id)

    // Handle new transcriptions (shouldn't happen for restore, but handle gracefully)
    if (id.startsWith('new_transcription')) {
      console.log('Cannot restore new transcription')
      return NextResponse.json({ error: 'Cannot restore new transcriptions' }, { status: 400 })
    }

    // Handle existing transcriptions
    const [patient_id_str, session_id_str] = id.split('_')
    const patient_id = parseInt(patient_id_str)
    const session_id = parseInt(session_id_str)

    console.log('Parsed IDs:', { patient_id, session_id })

    if (isNaN(patient_id) || isNaN(session_id)) {
      console.log('Invalid ID format')
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    console.log('Attempting to update database...')
    const updated = await prisma.patient_uploads.update({
      where: { patient_id_session_id: { patient_id, session_id } },
      data: { is_approved: false },
    })

    console.log('Database updated successfully:', updated)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json({ error: 'Failed to restore note' }, { status: 500 })
  }
}