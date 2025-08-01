import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get staff ID from cookies
    const staffId = request.cookies.get('staff_id')?.value
    
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found' }, { status: 401 })
    }

    // Fetch room data from Flask server with staff ID
    const response = await fetch(`http://localhost:5000/room-data?staff_id=${staffId}`)
    
    if (!response.ok) {
      throw new Error(`Flask server responded with status: ${response.status}`)
    }
    
    const roomData = await response.json()
    
    return NextResponse.json(roomData)
  } catch (error) {
    console.error('Error fetching room data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 