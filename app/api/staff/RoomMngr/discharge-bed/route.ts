import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bedId, centerId, dischargePatient = false } = body;

    if (!bedId || !centerId) {
      return NextResponse.json({ 
        error: 'Missing required fields: bedId and centerId are required' 
      }, { status: 400 });
    }

    // Validate that the bed exists and belongs to the specified center
    const bed = await prisma.bed_info.findFirst({
      where: {
        bed_id: bedId,
        room_info: {
          center_id: centerId
        }
      },
      include: {
        room_info: true,
        patient_info: true
      }
    });

    if (!bed) {
      return NextResponse.json({ 
        error: 'Bed not found or does not belong to the specified center' 
      }, { status: 404 });
    }

    // If discharging patient, mark patient as discharged
    if (dischargePatient && bed.assigned_patient_id) {
      await prisma.patient_info.update({
        where: { patient_id: bed.assigned_patient_id },
        data: { 
          is_discharged: true,
          dicharged_date: new Date()
        }
      });
    }

    // Clear bed assignment
    await prisma.bed_info.update({
      where: { bed_id: bedId },
      data: {
        assigned_patient_id: null,
        assigned_nurse_id: null,
        is_assigned: false,
        is_available: true
      }
    });

    // Check if room should be marked as not full
    const roomBeds = await prisma.bed_info.findMany({
      where: { room_id: bed.room_id }
    });

    const allBedsAssigned = roomBeds.every(b => b.is_assigned);
    
    if (!allBedsAssigned) {
      await prisma.room_info.update({
        where: { room_id: bed.room_id },
        data: { is_full: false }
      });
    }

    return NextResponse.json({ 
      success: true,
      message: dischargePatient ? 'Patient discharged and bed cleared' : 'Bed assignment cleared'
    });
  } catch (error) {
    console.error('Error discharging bed:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 