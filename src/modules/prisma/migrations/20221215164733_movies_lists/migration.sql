-- CreateTable
CREATE TABLE "movie_watch_list" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" TEXT NOT NULL,

    CONSTRAINT "movie_watch_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_favourites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" TEXT NOT NULL,

    CONSTRAINT "movie_favourites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_watched" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" TEXT NOT NULL,

    CONSTRAINT "movie_watched_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie_watch_list" ADD CONSTRAINT "movie_watch_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_favourites" ADD CONSTRAINT "movie_favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_watched" ADD CONSTRAINT "movie_watched_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
