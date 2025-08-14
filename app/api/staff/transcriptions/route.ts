import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const staffId = cookieStore.get('staff_Id')?.value

    if (!staffId) {
      return NextResponse.json(
        { error: 'Staff ID not found in cookies' },
        { status: 401 }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(
      `http://localhost:5001/transcriptions/${encodeURIComponent(staffId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      throw new Error(`Flask API responded with status: ${response.status} ${text}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    const status = (error as any)?.name === 'AbortError' ? 504 : 500
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status }
    )
  }
}

