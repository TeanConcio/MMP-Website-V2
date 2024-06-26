-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('FULLY_PAID', 'PARTIALLY_PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'WIDOWED', 'ANNULLED');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING_APPROVAL', 'IN_PROGRESS', 'CANCELLED', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "Programs" AS ENUM ('FOUNDATIONAL_COURSES', 'BIBLICAL_FOUNDATION', 'TEACHER_TRACK', 'ADMIN_TRACK');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'REJECTED', 'UNPAID', 'SENT');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'GRADUATED', 'WITHDRAWN', 'FOR_APPROVAL', 'REJECTED');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'FOR_APPROVAL', 'REJECTED');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('PENDING', 'RESPONDED', 'SPAM', 'CLOSED');

-- CreateEnum
CREATE TYPE "Track" AS ENUM ('ADMIN', 'TEACHER', 'BOTH');

-- CreateTable
CREATE TABLE "Admins" (
    "admin_id" VARCHAR(12) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Bills" (
    "bill_no" VARCHAR(11) NOT NULL,
    "fee" DECIMAL(9,2) NOT NULL,
    "deductions" DECIMAL(9,2) NOT NULL,
    "billed_to" VARCHAR(12) NOT NULL,
    "remarks" VARCHAR(200),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "status" "BillStatus" NOT NULL DEFAULT 'UNPAID',
    "issued_on" DATE NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("bill_no")
);

-- CreateTable
CREATE TABLE "Module_Details" (
    "module_name" VARCHAR(100) NOT NULL,
    "prerequisites" VARCHAR(100)[] DEFAULT (ARRAY[]::character varying[])::character varying(100)[],
    "description" TEXT NOT NULL,
    "program" "Programs" NOT NULL,

    CONSTRAINT "Module_Details_pkey" PRIMARY KEY ("module_name")
);

-- CreateTable
CREATE TABLE "Module_Enrollments" (
    "student_id" VARCHAR(12) NOT NULL,
    "module_name" VARCHAR(100) NOT NULL,
    "school_year" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "bill_no" VARCHAR(11),
    "grade" VARCHAR(4),
    "date_submitted" DATE,
    "date_received" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "no_of_absences" INTEGER NOT NULL DEFAULT 0,
    "remarks" VARCHAR(200),

    CONSTRAINT "Module_Enrollments_pkey" PRIMARY KEY ("student_id","module_name","school_year")
);

-- CreateTable
CREATE TABLE "Module_Names" (
    "module_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Module_Names_pkey" PRIMARY KEY ("module_name")
);

-- CreateTable
CREATE TABLE "Modules" (
    "module_name" VARCHAR(100) NOT NULL,
    "school_year" INTEGER NOT NULL,
    "teacher_id" VARCHAR(12),
    "session_1" DATE NOT NULL,
    "session_2" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("module_name","school_year")
);

-- CreateTable
CREATE TABLE "Payments" (
    "or_no" VARCHAR(11) NOT NULL,
    "bill_no" VARCHAR(11) NOT NULL,
    "payee" VARCHAR(12) NOT NULL,
    "payment" DECIMAL(9,2) NOT NULL,
    "remarks" VARCHAR(200),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "paid_on" DATE NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("or_no")
);

-- CreateTable
CREATE TABLE "Students" (
    "student_id" VARCHAR(12) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50),
    "address" VARCHAR(150) NOT NULL,
    "mobile_number" VARCHAR(11) NOT NULL,
    "landline" VARCHAR(8) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "birthplace" VARCHAR(150) NOT NULL,
    "nationality" VARCHAR(20) NOT NULL,
    "gender" "Gender" NOT NULL,
    "civil_status" "CivilStatus" NOT NULL,
    "no_of_children" INTEGER NOT NULL,
    "school" VARCHAR(30) NOT NULL,
    "occupation" VARCHAR(30) NOT NULL,
    "admin" VARCHAR(150) NOT NULL,
    "is_partner_school" BOOLEAN NOT NULL,
    "gradeschool" VARCHAR(50) NOT NULL DEFAULT 'None',
    "highschool" VARCHAR(50) NOT NULL DEFAULT 'None',
    "college" VARCHAR(50) NOT NULL DEFAULT 'None',
    "graduate" VARCHAR(50) NOT NULL DEFAULT 'None',
    "others" VARCHAR(200) NOT NULL DEFAULT 'None',
    "gradeschool_completed" BOOLEAN NOT NULL,
    "highschool_completed" BOOLEAN NOT NULL,
    "college_completed" BOOLEAN NOT NULL,
    "graduate_completed" BOOLEAN NOT NULL,
    "essay" TEXT NOT NULL,
    "emergency_name" VARCHAR(150) NOT NULL,
    "emergency_address" VARCHAR(150) NOT NULL,
    "emergency_mobile_number" VARCHAR(11) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "status" "StudentStatus" NOT NULL DEFAULT 'FOR_APPROVAL',
    "track" "Track" NOT NULL,
    "church" VARCHAR(150) NOT NULL,
    "college_course" VARCHAR(50) NOT NULL DEFAULT 'None',
    "graduate_course" VARCHAR(50) NOT NULL DEFAULT 'None',
    "pastor" VARCHAR(150) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "TOR_Requests" (
    "req_id" VARCHAR(10) NOT NULL,
    "student_id" VARCHAR(12) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "request_date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "TOR_Requests_pkey" PRIMARY KEY ("req_id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacher_id" VARCHAR(12) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(25),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "status" "TeacherStatus" NOT NULL DEFAULT 'FOR_APPROVAL',

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticket_id" VARCHAR(10) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mobile_number" VARCHAR(11) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'PENDING',
    "create_date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Module_Enrollments_bill_no_key" ON "Module_Enrollments"("bill_no" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_email_key" ON "Teachers"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_email_key" ON "Tickets"("email" ASC);

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_billed_to_fkey" FOREIGN KEY ("billed_to") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Details" ADD CONSTRAINT "Module_Details_module_name_fkey" FOREIGN KEY ("module_name") REFERENCES "Module_Names"("module_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_bill_no_fkey" FOREIGN KEY ("bill_no") REFERENCES "Bills"("bill_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_module_name_school_year_fkey" FOREIGN KEY ("module_name", "school_year") REFERENCES "Modules"("module_name", "school_year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_module_name_fkey" FOREIGN KEY ("module_name") REFERENCES "Module_Details"("module_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_bill_no_fkey" FOREIGN KEY ("bill_no") REFERENCES "Bills"("bill_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payee_fkey" FOREIGN KEY ("payee") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TOR_Requests" ADD CONSTRAINT "TOR_Requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

