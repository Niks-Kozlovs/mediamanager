import { FieldResolver } from "nexus";
import { addTvShowIfNotExist } from "../../utils/addTvShowIfNotExist";
import { getUserFromCookie } from "./loginAttempt";

export const addTVShowToFavoritesResolver: FieldResolver<"Mutation", "addTVShowToFavorites"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addTvShowIfNotExist(tvShowId, ctx);

    await prisma.tVFavourites.create({
        data: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    return true;
}

export const removeTVShowFromFavoritesResolver: FieldResolver<"Mutation", "removeTVShowFromFavorites"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const favoriteTVShow = await prisma.tVFavourites.findFirst({
        where: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    if (!favoriteTVShow) {
        return false;
    }

    await prisma.tVFavourites.delete({
        where: {
            id: favoriteTVShow.id,
        },
    });

    return true;
}

export const getTVShowFavoritesResolver: FieldResolver<"Query", "getTVShowFavorites"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const favorites = await prisma.tVFavourites.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            tvDetails: true,
        }
    });

    const list = favorites.map(({ tvDetails: md }) => { return {id: md.tv_id, ...md}});

    return list;
}