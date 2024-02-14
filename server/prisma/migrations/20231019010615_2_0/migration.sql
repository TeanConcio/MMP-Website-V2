/*
  Warnings:

  - The `status` column on the `Teachers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'REJECTED', 'UNPAID', 'SENT');

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];

-- AlterTable
ALTER TABLE "Teachers" DROP COLUMN "status",
ADD COLUMN     "status" "TeacherStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Activity";

-- CreateTable
CREATE TABLE "TOR_Requests" (
    "req_id" VARCHAR(10) NOT NULL,
    "student_id" VARCHAR(12) NOT NULL,
    "module_name" VARCHAR(50) NOT NULL,
    "school_year" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "request_date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "TOR_Requests_pkey" PRIMARY KEY ("req_id","student_id","module_name","school_year")
);

-- AddForeignKey
ALTER TABLE "TOR_Requests" ADD CONSTRAINT "TOR_Requests_student_id_module_name_school_year_fkey" FOREIGN KEY ("student_id", "module_name", "school_year") REFERENCES "Module_Enrollments"("student_id", "module_name", "school_year") ON DELETE RESTRICT ON UPDATE CASCADE;
