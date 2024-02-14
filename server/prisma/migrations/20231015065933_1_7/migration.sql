-- DropForeignKey
ALTER TABLE "Module_Enrollments" DROP CONSTRAINT "Module_Enrollments_bill_no_fkey";

-- AlterTable
ALTER TABLE "Module_Enrollments" ALTER COLUMN "bill_no" DROP NOT NULL,
ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "date_submitted" DROP NOT NULL,
ALTER COLUMN "date_received" DROP NOT NULL,
ALTER COLUMN "record" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];

-- AddForeignKey
ALTER TABLE "Module_Enrollments" ADD CONSTRAINT "Module_Enrollments_bill_no_fkey" FOREIGN KEY ("bill_no") REFERENCES "Bills"("bill_no") ON DELETE SET NULL ON UPDATE CASCADE;
