/*
  Warnings:

  - A unique constraint covering the columns `[cuid]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `Animal` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "cuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Animal_cuid_key" ON "Animal"("cuid");

-- CreateIndex
CREATE INDEX "Animal_cuid_userId_idx" ON "Animal"("cuid", "userId");
