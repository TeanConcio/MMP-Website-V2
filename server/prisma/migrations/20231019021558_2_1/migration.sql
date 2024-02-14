/*
  Warnings:

  - The primary key for the `TOR_Requests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "others" SET DEFAULT ARRAY[]::VARCHAR(50)[];

-- AlterTable
ALTER TABLE "TOR_Requests" DROP CONSTRAINT "TOR_Requests_pkey",
ADD CONSTRAINT "TOR_Requests_pkey" PRIMARY KEY ("req_id");
