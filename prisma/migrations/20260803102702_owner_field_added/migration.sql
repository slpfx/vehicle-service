/*
  Warnings:

  - Added the required column `owner` to the `Vihecle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vihecle" ADD COLUMN     "owner" INTEGER NOT NULL;
