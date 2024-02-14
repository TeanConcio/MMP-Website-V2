/*
  Warnings:

  - You are about to drop the column `module_name` on the `TOR_Requests` table. All the data in the column will be lost.
  - You are about to drop the column `school_year` on the `TOR_Requests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TOR_Requests" DROP CONSTRAINT "TOR_Requests_student_id_module_name_school_year_fkey";

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];

-- AlterTable
ALTER TABLE "TOR_Requests" DROP COLUMN "module_name",
DROP COLUMN "school_year";

-- AddForeignKey
ALTER TABLE "TOR_Requests" ADD CONSTRAINT "TOR_Requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
