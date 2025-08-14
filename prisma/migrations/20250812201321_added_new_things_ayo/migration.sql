/*
  Warnings:

  - You are about to drop the column `logo` on the `medicalcenter_info` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `medicalcenter_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicalcenter_info" DROP COLUMN "logo",
DROP COLUMN "website",
ADD COLUMN     "address" VARCHAR(400),
ADD COLUMN     "email" VARCHAR(400);

-- AlterTable
ALTER TABLE "patient_info" ADD COLUMN     "dicharged_date" DATE,
ADD COLUMN     "is_discharged" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "room_info" ADD COLUMN     "is_full" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "bed_info" (
    "bed_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "bed_letter" VARCHAR(1) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "is_assigned" BOOLEAN NOT NULL DEFAULT false,
    "assigned_patient_id" INTEGER,
    "assigned_nurse_id" INTEGER,

    CONSTRAINT "bed_info_pkey" PRIMARY KEY ("bed_id")
);

-- CreateTable
CREATE TABLE "room_data" (
    "id" SERIAL NOT NULL,
    "bed_id" INTEGER NOT NULL,
    "audio_path" VARCHAR(400) NOT NULL,

    CONSTRAINT "room_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bed_info" ADD CONSTRAINT "bed_info_assigned_nurse_id_fkey" FOREIGN KEY ("assigned_nurse_id") REFERENCES "user_info"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bed_info" ADD CONSTRAINT "bed_info_assigned_patient_id_fkey" FOREIGN KEY ("assigned_patient_id") REFERENCES "patient_info"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bed_info" ADD CONSTRAINT "bed_info_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room_info"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_data" ADD CONSTRAINT "room_data_bed_id_fkey" FOREIGN KEY ("bed_id") REFERENCES "bed_info"("bed_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
