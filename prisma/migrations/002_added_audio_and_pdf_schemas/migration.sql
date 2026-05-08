-- CreateTable Recording
CREATE TABLE IF NOT EXISTS "Recording" (
    "id" TEXT NOT NULL,
    "audioPath" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);

-- CreateTable PdfFile
CREATE TABLE IF NOT EXISTS "PdfFile" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id")
);

-- AlterTable room_data (drop columns only if they exist)
ALTER TABLE "room_data" 
    DROP COLUMN IF EXISTS "audio_path",
    DROP COLUMN IF EXISTS "pdf_path",
    ADD COLUMN IF NOT EXISTS "recording_id" TEXT,
    ADD COLUMN IF NOT EXISTS "pdf_id" TEXT;

-- AddForeignKey (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'room_data_recording_id_fkey'
    ) THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_recording_id_fkey" 
            FOREIGN KEY ("recording_id") REFERENCES "Recording"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'room_data_pdf_id_fkey'
    ) THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_pdf_id_fkey" 
            FOREIGN KEY ("pdf_id") REFERENCES "PdfFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;