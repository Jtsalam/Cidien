import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Parse id to extract patient_id and session_id
    const [patient_id_str, session_id_str] = id.split('_')
    const patient_id = parseInt(patient_id_str)
    const session_id = parseInt(session_id_str)

    if (isNaN(patient_id) || isNaN(session_id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const updated = await prisma.patient_uploads.update({
      where: { patient_id_session_id: { patient_id, session_id } },
      data: { is_approved: false },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json({ error: 'Failed to restore note' }, { status: 500 })
  }
}