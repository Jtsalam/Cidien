-- CreateTable
CREATE TABLE "medicalcenter_info" (
    "center_id" SERIAL NOT NULL,
    "center_name" TEXT NOT NULL,
    "logo" VARCHAR(400) NOT NULL,
    "website" VARCHAR(400) NOT NULL,

    CONSTRAINT "medicalcenter_info_pkey" PRIMARY KEY ("center_id")
);

-- CreateTable
CREATE TABLE "patient_info" (
    "patient_id" SERIAL NOT NULL,
    "patient_name" TEXT NOT NULL,
    "registered_date" DATE NOT NULL,
    "center_id" INTEGER NOT NULL,

    CONSTRAINT "patient_info_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "patient_uploads" (
    "patient_id" INTEGER NOT NULL,
    "session_id" INTEGER NOT NULL,
    "upload_path" TEXT NOT NULL,
    "patient_notes" TEXT NOT NULL,
    "upload_time" TIME(6) NOT NULL,

    CONSTRAINT "patient_uploads_pkey" PRIMARY KEY ("patient_id","session_id")
);

-- CreateTable
CREATE TABLE "room_info" (
    "room_id" SERIAL NOT NULL,
    "room_number" INTEGER NOT NULL,
    "center_id" INTEGER NOT NULL,
    "number_of_beds" INTEGER NOT NULL,

    CONSTRAINT "room_info_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "room_register" (
    "room_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "session_id" INTEGER NOT NULL,
    "center_id" INTEGER NOT NULL,
    "reg_date" DATE NOT NULL,
    "reg_time" TIME(6) NOT NULL,

    CONSTRAINT "room_register_pkey" PRIMARY KEY ("room_id","patient_id","session_id")
);

-- CreateTable
CREATE TABLE "user_info" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "user_role" TEXT NOT NULL,
    "center_id" INTEGER NOT NULL,
    "charter_id" TEXT NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_uploads" (
    "user_id" INTEGER NOT NULL,
    "center_id" INTEGER NOT NULL,
    "upload_path" TEXT NOT NULL,
    "unassigned_uploads" TEXT NOT NULL,
    "upload_date" DATE NOT NULL,
    "upload_time" TIME(6) NOT NULL,

    CONSTRAINT "user_uploads_pkey" PRIMARY KEY ("user_id","center_id")
);

-- AddForeignKey
ALTER TABLE "patient_info" ADD CONSTRAINT "patient_info_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patient_uploads" ADD CONSTRAINT "patient_uploads_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient_info"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_info" ADD CONSTRAINT "room_info_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_register" ADD CONSTRAINT "room_register_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_register" ADD CONSTRAINT "room_register_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient_info"("patient_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "room_register" ADD CONSTRAINT "room_register_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room_info"("room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_uploads" ADD CONSTRAINT "user_uploads_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "medicalcenter_info"("center_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_uploads" ADD CONSTRAINT "user_uploads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_info"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
