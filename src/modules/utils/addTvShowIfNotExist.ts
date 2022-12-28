import { Context } from "../../types/Context";
import { makeRequest } from "./makeRequest";

export const addTvShowIfNotExist = async (tvShowId: string, ctx: Context) => {
    const { prisma } = ctx;

    const tvShowDetails = await prisma.tVDetails.findFirst({
        where: {
            tv_id: tvShowId,
        },
        select: {
            tv_id: true,
        }
    });

    if (!tvShowDetails) {
        const tvShowDetails = await makeRequest(`tv/${tvShowId}`);
        await prisma.tVDetails.create({
            data: {
                tv_id: tvShowDetails.id.toString(),
                poster_path: tvShowDetails.poster_path,
                overview: tvShowDetails.overview,
                first_air_date: tvShowDetails.first_air_date,
                original_name: tvShowDetails.original_name,
                name: tvShowDetails.name,
                backdrop_path: tvShowDetails.backdrop_path,
                genre_ids: tvShowDetails.genre_ids,
                original_language: tvShowDetails.original_language,
                popularity: tvShowDetails.popularity,
                vote_count: tvShowDetails.vote_count,
                vote_average: tvShowDetails.vote_average,
                episode_count: tvShowDetails.number_of_episodes,
                in_production: tvShowDetails.in_production,
            },
        });
    }
}