/*
  Warnings:

  - You are about to drop the column `last_checked` on the `MovieDetails` table. All the data in the column will be lost.
  - You are about to drop the column `last_checked` on the `TVDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MovieDetails" DROP COLUMN "last_checked";

-- AlterTable
ALTER TABLE "TVDetails" DROP COLUMN "last_checked";
