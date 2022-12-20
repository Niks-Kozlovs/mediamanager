import { MovieDetails } from "@prisma/client";

export const movieDetailsToMovie = (movieDetails: MovieDetails) => {
    const { movie_id, ...rest } = movieDetails;
    return {
        id: movie_id,
        ...rest,
    };
};