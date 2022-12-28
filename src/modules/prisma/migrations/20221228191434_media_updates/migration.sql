/*
  Warnings:

  - Added the required column `last_updated` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episode_count` to the `TVDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `in_production` to the `TVDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated` to the `TVDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('RUMORED', 'PLANNED', 'IN_PRODUCTION', 'POST_PRODUCTION', 'RELEASED', 'CANCELED');

-- AlterTable
ALTER TABLE "MovieDetails" ADD COLUMN     "last_checked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_updated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "MovieStatus",
ALTER COLUMN "release_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TVDetails" ADD COLUMN     "episode_count" INTEGER NOT NULL,
ADD COLUMN     "in_production" BOOLEAN NOT NULL,
ADD COLUMN     "last_checked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_check" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
