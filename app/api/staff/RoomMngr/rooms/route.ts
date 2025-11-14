import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { orgMap } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

// Type definitions for Prisma query results
type RoomWithBeds = {
    room_id: number;
    room_number: number;
    number_of_beds: number;
    is_full: boolean;
    center_id: number;
    bed_info: {
      bed_id: number;
      bed_letter: string;
      room_id: number;
      is_assigned: boolean;
      is_available: boolean;
      assigned_patient_id: number | null;
      assigned_nurse_id: number | null;
      patient_info?: {
        patient_id: number;
        patient_name: string;
      } | null;
      user_info?: {
        user_id: number;
        user_name: string;
      } | null;
    }[];
  };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Center ID is required' },
        { status: 400 }
      );
    }

    // Fetch rooms with their beds and assignment information
    const rooms = await prisma.room_info.findMany({
      where: {
        center_id: parseInt(organizationId),
      },
      include: {
        bed_info: {
          include: {
            patient_info: {
              select: {
                patient_id: true,
                patient_name: true,
              }
            },
            user_info: {
              select: {
                user_id: true,
                user_name: true,
              }
            }
          },
          orderBy: {
            bed_letter: 'asc',
          },
        },
      },
      orderBy: {
        room_number: 'asc',
      },
    });

    // Transform the data to match our component interface
    const transformedRooms = rooms.map((room: RoomWithBeds) => ({
        id: room.room_id,
        room_number: room.room_number.toString(),
        is_full: room.is_full,
        organization_id: room.center_id,
        beds: room.bed_info.map((bed) => ({
          id: bed.bed_id,
          bed_id: bed.bed_id, // Add this to match frontend expectations
          bed_letter: bed.bed_letter,
          room_id: bed.room_id,
          is_assigned: bed.is_assigned,
          is_available: bed.is_available,
          assigned_patient: bed.patient_info,
          assigned_nurse: bed.user_info,
        })),
      }));

    return NextResponse.json({
      rooms: transformedRooms,
      count: transformedRooms.length,
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST() {
    const cookieStore = await cookies();
    const org = cookieStore.get("organization")?.value;
    
    if (!org) {
        return new Response(
            JSON.stringify({ success: false, message: "organization cookie not found" }),
            { status: 400 }
        );
    }
    
    try {
        //Get organization information from database
        const organization = await prisma.medicalcenter_info.findFirst({
            where: { center_name: orgMap[org] }
        });
        
        if (organization) {
            const response = new Response(
                JSON.stringify({ success: true, centerId: organization.center_id }), 
                { status: 200 }
            );
            return response;
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "Error getting Id for center" }), 
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Error fetching center ID:', error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }), 
            { status: 500 }
        );
    }
}