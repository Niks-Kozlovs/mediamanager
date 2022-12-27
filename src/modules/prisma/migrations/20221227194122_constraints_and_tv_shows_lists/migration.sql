/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `movie_favourites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,movie_id]` on the table `movie_watch_list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,movie_id]` on the table `movie_watched` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adult` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_language` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieDetails" ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "video" BOOLEAN NOT NULL,
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vote_count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tv_watch_list" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tv_id" TEXT NOT NULL,

    CONSTRAINT "tv_watch_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_favourites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tv_id" TEXT NOT NULL,

    CONSTRAINT "tv_favourites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_watched" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tv_id" TEXT NOT NULL,

    CONSTRAINT "tv_watched_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TVDetails" (
    "tv_id" TEXT NOT NULL,
    "poster_path" TEXT,
    "popularity" DOUBLE PRECISION NOT NULL,
    "backdrop_path" TEXT,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "overview" TEXT,
    "first_air_date" TEXT NOT NULL,
    "origin_country" TEXT[],
    "genre_ids" INTEGER[],
    "original_language" TEXT NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,

    CONSTRAINT "TVDetails_pkey" PRIMARY KEY ("tv_id")
);

-- CreateTable
CREATE TABLE "tv_season" (
    "id" SERIAL NOT NULL,
    "tv_id" TEXT NOT NULL,
    "season_number" INTEGER NOT NULL,
    "air_date" TEXT NOT NULL,
    "episode_count" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "season_id" INTEGER NOT NULL,

    CONSTRAINT "tv_season_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tv_watch_list_user_id_tv_id_key" ON "tv_watch_list"("user_id", "tv_id");

-- CreateIndex
CREATE UNIQUE INDEX "tv_favourites_user_id_tv_id_key" ON "tv_favourites"("user_id", "tv_id");

-- CreateIndex
CREATE UNIQUE INDEX "tv_watched_user_id_tv_id_key" ON "tv_watched"("user_id", "tv_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_favourites_user_id_movie_id_key" ON "movie_favourites"("user_id", "movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_watch_list_user_id_movie_id_key" ON "movie_watch_list"("user_id", "movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_watched_user_id_movie_id_key" ON "movie_watched"("user_id", "movie_id");

-- AddForeignKey
ALTER TABLE "tv_watch_list" ADD CONSTRAINT "tv_watch_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_watch_list" ADD CONSTRAINT "tv_watch_list_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "TVDetails"("tv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_favourites" ADD CONSTRAINT "tv_favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_favourites" ADD CONSTRAINT "tv_favourites_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "TVDetails"("tv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_watched" ADD CONSTRAINT "tv_watched_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_watched" ADD CONSTRAINT "tv_watched_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "TVDetails"("tv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_season" ADD CONSTRAINT "tv_season_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "TVDetails"("tv_id") ON DELETE RESTRICT ON UPDATE CASCADE;
