-- CreateEnum
CREATE TYPE "State" AS ENUM ('ADOPTED', 'FOSTER', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CAT', 'DOG', 'HORSE');

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "type" "Type" NOT NULL,
    "description" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT E'AVAILABLE',
    "profilePic" TEXT,
    "height" INTEGER NOT NULL,
    "weigth" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "dieteryRestrictions" TEXT,
    "hypollergenic" BOOLEAN NOT NULL DEFAULT false,
    "breed" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
