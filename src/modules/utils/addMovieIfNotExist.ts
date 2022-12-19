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
            },
        });
    }
}