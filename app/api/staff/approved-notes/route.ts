import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const bed = searchParams.get('bed');

  if (!room || !bed) {
    return NextResponse.json({ error: 'Room and bed are required' }, { status: 400 });
  }

  try {
    // Fetch approved notes for the specific room and bed
    const notes = await prisma.room_data.findMany({
      where: {
        is_approved: 1,
        pdf_path: { not: null },
        bed_info: {
          bed_letter: bed,
          room_info: {
            room_number: parseInt(room, 10),
          },
        },
      },
      select: {
        id: true,
        pdf_path: true,
        patient_note: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Group by unique PDF path (each approval session creates one PDF)
    const pdfMap = new Map<string, { id: number; pdf_path: string; patient_note: string }>();
    
    notes.forEach((note) => {
      if (note.pdf_path && !pdfMap.has(note.pdf_path)) {
        pdfMap.set(note.pdf_path, {
          id: note.id,
          pdf_path: note.pdf_path,
          patient_note: note.patient_note
        });
      }
    });

    // Extract date and time from PDF filename
    // Filename format: chart_S001_20251103_225015_Room3127_BedA.pdf
    const notesWithDates = Array.from(pdfMap.values()).map((note) => {
      let approved_date = 'N/A';
      let approved_time = 'N/A';

      if (note.pdf_path) {
        // Extract timestamp from filename
        const match = note.pdf_path.match(/chart_[^_]+_(\d{8})_(\d{6})_/);
        if (match) {
          const dateStr = match[1]; // e.g., "20251103"
          const timeStr = match[2]; // e.g., "225015"
          
          // Format date: YYYY-MM-DD
          approved_date = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
          
          // Format time: HH:MM:SS
          approved_time = `${timeStr.substring(0, 2)}:${timeStr.substring(2, 4)}:${timeStr.substring(4, 6)}`;
        }
      }

      return {
        id: note.id,
        approved_date,
        approved_time,
        pdf_path: note.pdf_path || '',
        patient_note: note.patient_note,
      };
    });

    // Sort by date/time descending (newest first)
    notesWithDates.sort((a, b) => {
      const dateTimeA = `${a.approved_date} ${a.approved_time}`;
      const dateTimeB = `${b.approved_date} ${b.approved_time}`;
      return dateTimeB.localeCompare(dateTimeA);
    });

    return NextResponse.json({ notes: notesWithDates });
  } catch (error) {
    console.error('Error fetching approved notes:', error);
    return NextResponse.json({ error: 'Failed to fetch approved notes' }, { status: 500 });
  }
}