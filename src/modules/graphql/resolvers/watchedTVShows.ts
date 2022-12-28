import { FieldResolver } from "nexus";
import { getUserFromCookie } from "./loginAttempt";
import { addTvShowIfNotExist } from "../../utils/addTvShowIfNotExist";

export const addTVShowToWatchedResolver: FieldResolver<"Mutation", "addTVShowToWatched"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addTvShowIfNotExist(tvShowId, ctx);

    await prisma.tVWatched.create({
        data: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    return true;
}

export const removeTVShowFromWatchedResolver: FieldResolver<"Mutation", "removeTVShowFromWatched"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const watchedTVShow = await prisma.tVWatched.findFirst({
        where: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    if (!watchedTVShow) {
        return false;
    }

    await prisma.tVWatched.delete({
        where: {
            id: watchedTVShow.id,
        },
    });

    return true;
}

// @ts-expect-error - Prisma returns more info than we need
export const getWatchedTVShowsResolver: FieldResolver<"Query", "getWatchedTVShows"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const watched = await prisma.tVWatched.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            tvDetails: true,
        }
    });

    const list = watched.map(({ tvDetails: md }) => { return {id: md.tv_id, ...md}});

    return list;
}