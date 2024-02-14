-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'WIDOWED', 'ANNULLED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FULLY_PAID', 'PARTIALLY_PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('IN_PROGRESS', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Students" (
    "student_id" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "mobile_number" INTEGER NOT NULL,
    "landline" INTEGER NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "birthplace" VARCHAR(150) NOT NULL,
    "nationality" VARCHAR(20) NOT NULL,
    "gender" "Gender" NOT NULL,
    "civil_status" "CivilStatus" NOT NULL,
    "no_of_children" INTEGER NOT NULL,
    "school" VARCHAR(30) NOT NULL,
    "occupation" VARCHAR(30) NOT NULL,
    "admin" VARCHAR(125) NOT NULL,
    "is_partner_school" BOOLEAN NOT NULL,
    "gradeschool" VARCHAR(50) NOT NULL DEFAULT 'None',
    "highschool" VARCHAR(50) NOT NULL DEFAULT 'None',
    "college" VARCHAR(50) NOT NULL DEFAULT 'None',
    "graduate" VARCHAR(50) NOT NULL DEFAULT 'None',
    "others" VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR(50)[],
    "gradeschool_completed" BOOLEAN NOT NULL,
    "highschool_completed" BOOLEAN NOT NULL,
    "college_completed" BOOLEAN NOT NULL,
    "graduate_completed" BOOLEAN NOT NULL,
    "essay" TEXT NOT NULL,
    "form138" VARCHAR(200) NOT NULL,
    "id_picture" VARCHAR(200) NOT NULL,
    "emergency_name" VARCHAR(150) NOT NULL,
    "emergency_address" VARCHAR(150) NOT NULL,
    "emergency_mobile_number" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Bills" (
    "bill_no" VARCHAR(11) NOT NULL,
    "fee" DECIMAL(9,2) NOT NULL,
    "deductions" DECIMAL(9,2) NOT NULL,
    "billed_to" VARCHAR(10) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNPAID',
    "remarks" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("bill_no")
);

-- CreateTable
CREATE TABLE "Admins" (
    "admin_id" VARCHAR(10) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacher_id" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "status" "Activity" NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "or_no" VARCHAR(50) NOT NULL,
    "bill_no" VARCHAR(11) NOT NULL,
    "payee" VARCHAR(10) NOT NULL,
    "payment" DECIMAL(9,2) NOT NULL,
    "remarks" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("or_no")
);

-- CreateTable
CREATE TABLE "Modules" (
    "module_name" VARCHAR(50) NOT NULL,
    "school_year" INTEGER NOT NULL,
    "teacher_id" VARCHAR(10) NOT NULL,
    "session_1" DATE NOT NULL,
    "session_2" DATE NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("module_name","school_year")
);

-- CreateTable
CREATE TABLE "Module_Enrollments" (
    "student_id" VARCHAR(10) NOT NULL,
    "module_name" VARCHAR(50) NOT NULL,
    "school_year" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "bill_no" VARCHAR(11) NOT NULL,
    "grade" VARCHAR(4) NOT NULL,
    "date_submitted" DATE NOT NULL,
    "date_received" DATE NOT NULL,
    "record" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Module_Enrollments_pkey" PRIMARY KEY ("student_id","module_name","school_year")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Modules_module_name_key" ON "Modules"("module_name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_Enrollments_bill_no_key" ON "Module_Enrollments"("bill_no");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_billed_to_fkey" FOREIGN KEY ("billed_to") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_bill_no_fkey" FOREIGN KEY ("bill_no") REFERENCES "Bills"("bill_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payee_fkey" FOREIGN KEY ("payee") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_module_name_school_year_fkey" FOREIGN KEY ("module_name", "school_year") REFERENCES "Modules"("module_name", "school_year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_bill_no_fkey" FOREIGN KEY ("bill_no") REFERENCES "Bills"("bill_no") ON DELETE RESTRICT ON UPDATE CASCADE;
