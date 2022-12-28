import { extendType, list, objectType } from "nexus";
import { getUserFromCookie } from "../resolvers/loginAttempt";

export const getMediaUpdates = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getMediaUpdates", {
            type: list(MediaUpdate),
            resolve: async (_, __, ctx) => {
                const user = await getUserFromCookie(ctx);
                const prisma = ctx.prisma;

                const movieUpdates = prisma.movieWatchList.findMany({
                    where: {
                        user_id: user.id,
                        movieDetails: {
                            last_updated: {
                                gt: user.last_check,
                            },
                        }
                    },
                    include: {
                        movieDetails: true,
                    }
                });

                const tvUpdates = prisma.tVWatchList.findMany({
                    where: {
                        user_id: user.id,
                        tvDetails: {
                            last_updated: {
                                gt: user.last_check,
                            },
                        },
                    },
                    include: {
                        tvDetails: true,
                    },
                });

                const [movieUpdatesList, tvUpdatesList] = await Promise.all([movieUpdates, tvUpdates]);

                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        last_check: new Date(),
                    },
                });

                const movieList = movieUpdatesList.map(movie => ({
                    id: movie.movie_id,
                    name: movie.movieDetails.title,
                    image: movie.movieDetails.poster_path,
                    type: "movie",
                    date: movie.movieDetails.last_updated,
                }));

                const tvList = tvUpdatesList.map(tv => ({
                    id: tv.tv_id,
                    name: tv.tvDetails.name,
                    image: tv.tvDetails.poster_path,
                    type: "tv",
                    date: tv.tvDetails.last_updated,
                }));

                const list = [...movieList, ...tvList].sort((a, b) => b.date.getTime() - a.date.getTime());

                return list;
            },
        });
    },
});

const MediaUpdate = objectType({
    name: "MediaUpdate",
    definition(t) {
        t.string("id")
        t.string("name");
        t.string("image");
        t.string("type");
        t.date("date");
    },
});