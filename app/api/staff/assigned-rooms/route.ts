import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get("staff_Id")?.value;
    
    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID not found in cookies' },
        { status: 401 }
      );
    }

    // Call Flask backend to get assigned rooms
    const response = await fetch(`http://localhost:5001/staff/assigned-rooms?staff_id=${staffId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Flask API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching assigned rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assigned rooms' },
      { status: 500 }
    );
  }
} 