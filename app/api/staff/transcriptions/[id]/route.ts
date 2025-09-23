import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// PATCH /api/staff/transcriptions/[id] - Update a patient note
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
    }

    const { patient_note } = await request.json();

    if (typeof patient_note !== 'string') {
      return NextResponse.json({ error: "Invalid patient note provided." }, { status: 400 });
    }

    const updatedRecord = await prisma.room_data.update({
      where: { id },
      data: { patient_note },
    });

    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (error) {
    console.error("Error updating transcription:", error);
    return NextResponse.json({ error: "Failed to update transcription." }, { status: 500 });
  }
}

// DELETE /api/staff/transcriptions/[id] - Delete a transcription entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
    }

    // First, find the record to get the audio file path
    const recordToDelete = await prisma.room_data.findUnique({
      where: { id },
    });

    if (!recordToDelete) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }

    // Then, delete the record from the database
    await prisma.room_data.delete({
      where: { id },
    });

    // Finally, delete the associated audio file from the filesystem
    if (recordToDelete.audio_path) {
      try {
        // We need to resolve the absolute path from the project root.
        // The path in the DB is absolute, so we can use it directly.
        await fs.unlink(recordToDelete.audio_path);
        console.log(`Deleted audio file: ${recordToDelete.audio_path}`);
      } catch (fileError: any) {
        // If the file doesn't exist, that's okay. Log other errors.
        if (fileError.code !== 'ENOENT') {
          console.error("Error deleting audio file:", fileError);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting transcription:", error);
    return NextResponse.json({ error: "Failed to delete transcription." }, { status: 500 });
  }
}