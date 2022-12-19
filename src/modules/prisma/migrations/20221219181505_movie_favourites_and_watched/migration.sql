/*
  Warnings:

  - Made the column `release_date` on table `MovieDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MovieDetails" ALTER COLUMN "release_date" SET NOT NULL;
