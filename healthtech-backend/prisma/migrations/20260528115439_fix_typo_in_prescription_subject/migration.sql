/*
  Warnings:

  - You are about to drop the column `Subject` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `subject` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "Subject",
ADD COLUMN     "subject" TEXT NOT NULL;
