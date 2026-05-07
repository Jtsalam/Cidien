/*
  Warnings:

  - You are about to drop the column `charter_id` on the `user_info` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "charter_id",
DROP COLUMN "password";
