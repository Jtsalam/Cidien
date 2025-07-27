import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      bedId,
      centerId,
      roomId,
      patientName,
      nurseId,
      assignToAllBeds,
    } = body;

    // Validate required fields
    if (!patientName?.trim() || !bedId || !roomId || !centerId) {
      return NextResponse.json({ 
        error: 'Missing required fields: patientName, bedId, roomId, and centerId are required' 
      }, { status: 400 });
    }

    // Validate that the bed exists and belongs to the specified room and center
    const bed = await prisma.bed_info.findFirst({
      where: {
        bed_id: bedId,
        room_info: {
          room_id: roomId,
          center_id: centerId
        }
      },
      include: {
        room_info: true
      }
    });

    if (!bed) {
      return NextResponse.json({ 
        error: 'Bed not found or does not belong to the specified room/center' 
      }, { status: 404 });
    }

    // Check if patient already exists
    let patient = await prisma.patient_info.findFirst({
      where: {
        patient_name: patientName.trim(),
        center_id: centerId,
        is_discharged: false
      }
    });

    // Create new patient if doesn't exist
    if (!patient) {
      patient = await prisma.patient_info.create({
        data: {
          patient_name: patientName.trim(),
          registered_date: new Date(),
          center_id: centerId,
        },
      });
    }

    if (assignToAllBeds) {
      // Validate nurse exists if assigning to all beds
      if (nurseId) {
        const nurse = await prisma.user_info.findFirst({
          where: {
            user_id: nurseId,
            center_id: centerId
          }
        });

        if (!nurse) {
          return NextResponse.json({ 
            error: 'Nurse not found or does not belong to the specified center' 
          }, { status: 404 });
        }

        // Assign the nurse to all beds in the room
        await prisma.bed_info.updateMany({
          where: {
            room_id: roomId,
          },
          data: {
            assigned_nurse_id: nurseId,
          },
        });
      }
      
      // Assign the patient to the selected bed only
      await prisma.bed_info.update({
        where: { bed_id: bedId }, 
        data: {
          assigned_patient_id: patient.patient_id,
          is_assigned: true,
          is_available: false
        },
      });

    } else {
      // Validate nurse exists if provided
      if (nurseId) {
        const nurse = await prisma.user_info.findFirst({
          where: {
            user_id: nurseId,
            center_id: centerId
          }
        });

        if (!nurse) {
          return NextResponse.json({ 
            error: 'Nurse not found or does not belong to the specified center' 
          }, { status: 404 });
        }
      }

      // Assign just the selected bed
      await prisma.bed_info.update({
        where: { bed_id: bedId },
        data: {
          assigned_patient_id: patient.patient_id,
          assigned_nurse_id: nurseId,
          is_assigned: true,
          is_available: false
        },
      });
    }

    // Check if room should be marked as full
    const roomBeds = await prisma.bed_info.findMany({
      where: { room_id: roomId }
    });

    const allBedsAssigned = roomBeds.every(bed => bed.is_assigned);
    
    if (allBedsAssigned) {
      await prisma.room_info.update({
        where: { room_id: roomId },
        data: { is_full: true }
      });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Bed assigned successfully',
      patientId: patient.patient_id
    });
  } catch (error) {
    console.error('Error assigning bed:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}