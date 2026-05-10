-- DropForeignKey
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PdfFile_sessionId_fkey') THEN
        ALTER TABLE "PdfFile" DROP CONSTRAINT "PdfFile_sessionId_fkey";
    END IF;
END $$;

-- DropTable
DROP TABLE IF EXISTS "PdfFile";

-- CreateTable
CREATE TABLE IF NOT EXISTS "ApprovalPdfExport" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "displayName" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteCount" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ApprovalPdfExport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ApprovalPdfExportRow" (
    "exportId" TEXT NOT NULL,
    "roomDataId" INTEGER NOT NULL,
    CONSTRAINT "ApprovalPdfExportRow_pkey" PRIMARY KEY ("exportId","roomDataId")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "ApprovalPdfExport_filePath_key" ON "ApprovalPdfExport"("filePath");

-- AddForeignKey
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ApprovalPdfExport_sessionId_fkey') THEN
        ALTER TABLE "ApprovalPdfExport" ADD CONSTRAINT "ApprovalPdfExport_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "demo_session"("session_id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ApprovalPdfExport_userId_fkey') THEN
        ALTER TABLE "ApprovalPdfExport" ADD CONSTRAINT "ApprovalPdfExport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_info"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ApprovalPdfExportRow_exportId_fkey') THEN
        ALTER TABLE "ApprovalPdfExportRow" ADD CONSTRAINT "ApprovalPdfExportRow_exportId_fkey" FOREIGN KEY ("exportId") REFERENCES "ApprovalPdfExport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ApprovalPdfExportRow_roomDataId_fkey') THEN
        ALTER TABLE "ApprovalPdfExportRow" ADD CONSTRAINT "ApprovalPdfExportRow_roomDataId_fkey" FOREIGN KEY ("roomDataId") REFERENCES "room_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;