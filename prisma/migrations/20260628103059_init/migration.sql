/*
  Warnings:

  - You are about to drop the column `made` on the `Vihecle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vihecle" DROP COLUMN "made",
ADD COLUMN     "make" TEXT NOT NULL DEFAULT 'unknown';
