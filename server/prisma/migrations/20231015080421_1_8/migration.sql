-- AlterTable
ALTER TABLE "Bills" ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];
