/*
  Warnings:

  - Added the required column `password` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];
