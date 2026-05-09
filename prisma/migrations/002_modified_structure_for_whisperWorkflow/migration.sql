-- CreateEnum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'RecordingType') THEN
        CREATE TYPE "RecordingType" AS ENUM ('ROOM', 'NOTE');
    END IF;
END $$;

-- DropForeignKey
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'demo_session_center_id_fkey') THEN
        ALTER TABLE "demo_session" DROP CONSTRAINT "demo_session_center_id_fkey";
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_bed_id_fkey') THEN
        ALTER TABLE "room_data" DROP CONSTRAINT "room_data_bed_id_fkey";
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_pdf_id_fkey') THEN
        ALTER TABLE "room_data" DROP CONSTRAINT "room_data_pdf_id_fkey";
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_recording_id_fkey') THEN
        ALTER TABLE "room_data" DROP CONSTRAINT "room_data_recording_id_fkey";
    END IF;
END $$;

-- AlterTable PdfFile
ALTER TABLE "PdfFile"
    DROP COLUMN IF EXISTS "fileUrl",
    ADD COLUMN IF NOT EXISTS "sessionId" TEXT;

UPDATE "PdfFile" SET "sessionId" = '' WHERE "sessionId" IS NULL;
ALTER TABLE "PdfFile" ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable Recording
ALTER TABLE "Recording"
    DROP COLUMN IF EXISTS "audioUrl",
    ADD COLUMN IF NOT EXISTS "transcript" TEXT,
    ADD COLUMN IF NOT EXISTS "type" "RecordingType";

UPDATE "Recording" SET "type" = 'ROOM' WHERE "type" IS NULL;
ALTER TABLE "Recording" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable room_data
ALTER TABLE "room_data"
    DROP COLUMN IF EXISTS "pdf_id",
    DROP COLUMN IF EXISTS "recording_id",
    ADD COLUMN IF NOT EXISTS "noteRecordingId" TEXT,
    ADD COLUMN IF NOT EXISTS "roomRecordingId" TEXT,
    ADD COLUMN IF NOT EXISTS "sessionId" TEXT;

UPDATE "room_data" SET "sessionId" = '' WHERE "sessionId" IS NULL;
ALTER TABLE "room_data" ALTER COLUMN "sessionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "PdfFile_sessionId_key" ON "PdfFile"("sessionId");

-- AddForeignKey
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PdfFile_sessionId_fkey') THEN
        ALTER TABLE "PdfFile" ADD CONSTRAINT "PdfFile_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "demo_session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_sessionId_fkey') THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "demo_session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_roomRecordingId_fkey') THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_roomRecordingId_fkey" FOREIGN KEY ("roomRecordingId") REFERENCES "Recording"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_noteRecordingId_fkey') THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_noteRecordingId_fkey" FOREIGN KEY ("noteRecordingId") REFERENCES "Recording"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'room_data_bed_id_fkey') THEN
        ALTER TABLE "room_data" ADD CONSTRAINT "room_data_bed_id_fkey" FOREIGN KEY ("bed_id") REFERENCES "bed_info"("bed_id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'demo_session_center_id_fkey') THEN
        ALTER TABLE "demo_session" ADD CONSTRAINT "demo_session_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;