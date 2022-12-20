import { FieldResolver } from "nexus";
import { addMovieIfNotExist } from "../../utils/addMovieIfNotExist";
import { getUserFromCookie } from "./loginAttempt";

export const addMovieToWatchedResolver: FieldResolver<"Mutation", "addMovieToWatched"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addMovieIfNotExist(movieId, ctx);

    await prisma.movieWatched.create({
        data: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    return true;
}

export const removeMovieFromWatchedResolver: FieldResolver<"Mutation", "removeMovieFromWatched"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const watchedMovie = await prisma.movieWatched.findFirst({
        where: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    if (!watchedMovie) {
        return false;
    }

    await prisma.movieWatched.delete({
        where: {
            id: watchedMovie.id,
        },
    });

    return true;
}

export const getWatchedMoviesResolver: FieldResolver<"Query", "getWatchedMovies"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const watched = await prisma.movieWatched.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            movieDetails: true,
        }
    });

    const list = watched.map(({ movieDetails: md }) => { return {id: md.movie_id, ...md}});

    return list;
}