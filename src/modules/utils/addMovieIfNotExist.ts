import { MovieStatus } from "@prisma/client";
import { Context } from "../../types/Context";
import { makeRequest } from "./makeRequest";

export const addMovieIfNotExist = async (movieId: string, ctx: Context) => {
    const { prisma } = ctx;

    const movieDetails = await prisma.movieDetails.findFirst({
        where: {
            movie_id: movieId,
        },
        select: {
            movie_id: true,
        }
    });

    if (!movieDetails) {
        const movieDetails = await makeRequest(`movie/${movieId}`);
        await prisma.movieDetails.create({
            data: {
                movie_id: movieDetails.id.toString(),
                poster_path: movieDetails.poster_path,
                overview: movieDetails.overview,
                release_date: movieDetails.release_date,
                original_title: movieDetails.original_title,
                title: movieDetails.title,
                backdrop_path: movieDetails.backdrop_path,
                adult: movieDetails.adult,
                genre_ids: movieDetails.genre_ids,
                original_language: movieDetails.original_language,
                popularity: movieDetails.popularity,
                vote_count: movieDetails.vote_count,
                video: movieDetails.video,
                vote_average: movieDetails.vote_average,
                status: getMovieStatus(movieDetails.status),
            },
        });
    }
}

const getMovieStatus = (status: string) => {
    switch (status) {
        case "Rumored":
            return MovieStatus.RUMORED;
        case "Planned":
            return MovieStatus.PLANNED;
        case "In Production":
            return MovieStatus.IN_PRODUCTION;
        case "Post Production":
            return MovieStatus.POST_PRODUCTION;
        case "Released":
            return MovieStatus.RELEASED;
        case "Canceled":
            return MovieStatus.CANCELED;
        default:
            return null;
    }
}