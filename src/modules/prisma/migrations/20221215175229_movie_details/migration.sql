-- CreateTable
CREATE TABLE "MovieDetails" (
    "movie_id" TEXT NOT NULL,
    "poster_path" TEXT,
    "overview" TEXT,
    "release_date" TEXT,
    "original_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "backdrop_path" TEXT,

    CONSTRAINT "MovieDetails_pkey" PRIMARY KEY ("movie_id")
);

-- AddForeignKey
ALTER TABLE "movie_watch_list" ADD CONSTRAINT "movie_watch_list_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieDetails"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_favourites" ADD CONSTRAINT "movie_favourites_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieDetails"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_watched" ADD CONSTRAINT "movie_watched_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieDetails"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
