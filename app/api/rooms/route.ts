// app/api/rooms/route.ts (if using App Router) 
// or pages/api/rooms.ts (if using Pages Router)

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { orgMap } from "@/lib/constants";
import { prisma } from "@/lib/prisma";


// Type definitions for Prisma query results
type RoomWithBeds = {
    room_id: number;              // Changed from 'id'
    room_number: number;          // Changed from 'string' to 'number'
    number_of_beds: number;       // Added missing field
    is_full: boolean;
    center_id: number;            // Changed from 'organization_id'
    bed_info: {
      bed_id: number;
      bed_letter: string;
      room_id: number;
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

    // Fetch rooms with their beds
    const rooms = await prisma.room_info.findMany({
      where: {
        center_id: parseInt(organizationId),
      },
      include: {
        bed_info: {
          select: {
            bed_id: true,
            bed_letter: true,
            room_id: true,
          },
          orderBy: {
            bed_letter: 'asc', // Sort beds alphabetically
          },
        },
      },
      orderBy: {
        room_number: 'asc', // Sort rooms by room number
      },
    });

    // Transform the data to match our component interface
    const transformedRooms = rooms.map((room: RoomWithBeds) => ({
        id: room.room_id,                    // Map room_id to id
        room_number: room.room_number.toString(), // Convert to string if needed
        is_full: room.is_full,
        organization_id: room.center_id,     // Map center_id to organization_id
        beds: room.bed_info.map((bed) => ({
          id: bed.bed_id,                    // Map bed_id to id
          bed_letter: bed.bed_letter,
          room_id: bed.room_id,
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
export async function POST(req: Request) {
    const cookieStore = await cookies();
    const org = cookieStore.get("organization")?.value;
    //Error checking for org value
    if (!org) {
        return new Response(
            JSON.stringify({ success: false, message: "organization cookie not found" }),
            { status: 400 }
        );
    }
    //Get organization information from database
    const organization = await prisma.medicalcenter_info.findFirst({
        where:{center_name:orgMap[org]}
    })
    if(organization)
    {
        const response = new Response(JSON.stringify({ success: true, centerId: organization.center_id }), { status: 200 });
        return response
    }
    else
    {
        return new Response(JSON.stringify({ success: false, message: "Error getting Id for center" }), { status: 401 });
    }
}