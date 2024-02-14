/*
  Warnings:

  - The primary key for the `Admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Module_Enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_billed_to_fkey";

-- DropForeignKey
ALTER TABLE "Module_Enrollments" DROP CONSTRAINT "Module_Enrollments_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_payee_fkey";

-- AlterTable
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_pkey",
ALTER COLUMN "admin_id" SET DATA TYPE VARCHAR(12),
ADD CONSTRAINT "Admins_pkey" PRIMARY KEY ("admin_id");

-- AlterTable
ALTER TABLE "Bills" ALTER COLUMN "billed_to" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Module_Enrollments" DROP CONSTRAINT "Module_Enrollments_pkey",
ALTER COLUMN "student_id" SET DATA TYPE VARCHAR(12),
ADD CONSTRAINT "Module_Enrollments_pkey" PRIMARY KEY ("student_id", "module_name", "school_year");

-- AlterTable
ALTER TABLE "Modules" ALTER COLUMN "teacher_id" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "payee" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Students" DROP CONSTRAINT "Students_pkey",
ALTER COLUMN "student_id" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[],
ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id");

-- AlterTable
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_pkey",
ALTER COLUMN "teacher_id" SET DATA TYPE VARCHAR(12),
ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_billed_to_fkey" FOREIGN KEY ("billed_to") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payee_fkey" FOREIGN KEY ("payee") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
