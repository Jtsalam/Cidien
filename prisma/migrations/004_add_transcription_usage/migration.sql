CREATE TABLE IF NOT EXISTS "transcription_usage" (
    "ip" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "first_used" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transcription_usage_pkey" PRIMARY KEY ("ip")
);