/*
  Warnings:

  - You are about to alter the column `landline` on the `Students` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "mobile_number" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "landline" SET DATA TYPE VARCHAR(8),
ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[],
ALTER COLUMN "emergency_mobile_number" SET DATA TYPE VARCHAR(11);
