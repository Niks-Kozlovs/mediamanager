import { FieldResolver } from "nexus";
import { addMovieIfNotExist } from "../../utils/addMovieIfNotExist";
import { getUserFromCookie } from "./loginAttempt";
import { movieDetailsToMovie } from "../../utils/movieDetailsToMovie";

export const addMovieToFavouritesResolver: FieldResolver<"Mutation", "addMovieToFavourites"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addMovieIfNotExist(movieId, ctx);

    await prisma.movieFavourites.create({
        data: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    return true;
}

export const removeMovieFromFavouritesResolver: FieldResolver<"Mutation", "removeMovieFromFavourites"> = async (_, { movieId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const favouriteMovie = await prisma.movieFavourites.findFirst({
        where: {
            user_id: user.id,
            movie_id: movieId,
        },
    });

    if (!favouriteMovie) {
        return false;
    }

    await prisma.movieFavourites.delete({
        where: {
            id: favouriteMovie.id,
        },
    });

    return true;
}

export const getMovieFavouritesResolver: FieldResolver<"Query", "getMovieFavourites"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const favourites = await prisma.movieFavourites.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            movieDetails: true,
        }
    });

    const list = favourites.map(({ movieDetails: md }) => movieDetailsToMovie(md));

    return list;
}
