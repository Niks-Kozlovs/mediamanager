import { FieldResolver } from "nexus";
import { addTvShowIfNotExist } from "../../utils/addTvShowIfNotExist";
import { getUserFromCookie } from "./loginAttempt";

export const addTVShowToWatchLaterResolver: FieldResolver<"Mutation", "addTVShowToWatchLater"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    await addTvShowIfNotExist(tvShowId, ctx);

    await prisma.tVWatchList.create({
        data: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    return true;
}

export const removeTVShowFromWatchLaterResolver: FieldResolver<"Mutation", "removeTVShowFromWatchLater"> = async (_, { tvShowId }, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;
    const watchLaterTVShow = await prisma.tVWatchList.findFirst({
        where: {
            user_id: user.id,
            tv_id: tvShowId,
        },
    });

    if (!watchLaterTVShow) {
        return false;
    }

    await prisma.tVWatchList.delete({
        where: {
            id: watchLaterTVShow.id,
        },
    });

    return true;
}

//@ts-ignore
export const getWatchLaterTVShowsResolver: FieldResolver<"Query", "getTVShowWatchLater"> = async (_, __, ctx) => {
    const user = await getUserFromCookie(ctx);
    const { prisma } = ctx;

    const watchLater = await prisma.tVWatchList.findMany({
        where: {
            user_id: user.id,
        },
        include: {
            tvDetails: true,
        }
    });

    const list = watchLater.map(({ tvDetails: md }) => { return {id: md.tv_id, ...md}});

    return list;
}