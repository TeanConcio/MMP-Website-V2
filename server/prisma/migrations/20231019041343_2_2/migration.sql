-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "password" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[],
ALTER COLUMN "password" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "Teachers" ALTER COLUMN "password" SET DATA TYPE VARCHAR(150);
