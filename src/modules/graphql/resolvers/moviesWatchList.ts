import { FieldResolver } from "nexus";
import { makeRequest } from "../../utils/makeRequest";
import { getUserFromCookie } from "./loginAttempt";
import { addMovieIfNotExist } from "../../utils/addMovieIfNotExist";

export const addMovieToWatchlistResolver: FieldResolver<"Mutation", "addMovieToWatchlist"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addMovieIfNotExist(movieId, ctx);

    await prisma.movieWatchList.create({
        data: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    return true;
}

export const removeMovieFromWatchlistResolver: FieldResolver<"Mutation", "removeMovieFromWatchlist"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const watchlistMovie = await prisma.movieWatchList.findFirst({
        where: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    if (!watchlistMovie) {
        return false;
    }

    await prisma.movieWatchList.delete({
        where: {
            id: watchlistMovie.id,
        },
    });

    return true;
}

export const getMovieWatchListResolver: FieldResolver<"Query", "getMovieWatchlist"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const watchlist = await prisma.movieWatchList.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            movieDetails: true,
        }
    });

    const list = watchlist.map(({ movieDetails: md }: any) => { return {id: md.movie_id, ...md}});

    return list;
}