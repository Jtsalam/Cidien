import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get('staff_Id')?.value;
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found in cookies' }, { status: 401 });
    }
    const body = await request.json();
    const { room, bed } = body;
    // Proxy to Flask backend
    const response = await fetch('http://localhost:5000/staff/approve-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staff_id: staffId, room, bed}),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error approving notes:', error);
    return NextResponse.json({ error: 'Failed to approve notes' }, { status: 500 });
  }
}

