import { extendType, intArg, nonNull, objectType } from "nexus";
import { makeRequest } from "../../utils/makeRequest";

export const getTopRatedTvShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTopRatedTvShows", {
            type: tvShowResults,
            resolve: async () => await makeRequest("tv/top_rated"),
        });
    },
});

export const getPopularTvShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getPopularTvShows", {
            type: tvShowResults,
            resolve: async () => await makeRequest("tv/popular"),
        });
    },
});

export const getAringSoonTvShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getAringSoonTvShows", {
            type: tvShowResults,
            resolve: async () => await makeRequest("tv/on_the_air"),
        });
    },
});

export const getAiringTodayTvShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getAiringTodayTvShows", {
            type: tvShowResults,
            resolve: async () => await makeRequest("tv/airing_today"),
        });
    },
});

export const getSimilarTvShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getSimilarTvShows", {
            type: tvShowResults,
            args: { tvShowId: nonNull(intArg()) },
            resolve: async (_, { tvShowId }) => await makeRequest(`tv/${tvShowId}/similar`),
        });
    },
});

export const getTvShowRecommendations = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTvShowRecommendations", {
            type: tvShowResults,
            args: { tvShowId: nonNull(intArg()) },
            resolve: async (_, { tvShowId }) => await makeRequest(`tv/${tvShowId}/recommendations`),
        });
    },
});

export const getTvShowCredits = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTvShowCredits", {
            type: tvShowCredits,
            args: { tvShowId: nonNull(intArg()) },
            resolve: async (_, { tvShowId }) => await makeRequest(`tv/${tvShowId}/credits`),
        });
    },
});

export const getTvShowAggregateCredits = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTvShowAggregateCredits", {
            type: tvShowCredits,
            args: { tvShowId: nonNull(intArg()) },
            resolve: async (_, { tvShowId }) => await makeRequest(`tv/${tvShowId}/aggregate_credits`),
        });
    },
});

const tvShowCredits = objectType({
    name: "TvShowCredits",
    definition(t) {
        t.nonNull.list.field("cast", { type: tvShowCast });
        t.nonNull.list.field("crew", { type: tvShowCrew });
        t.nonNull.int("id");
    },
});

const tvShowCast = objectType({
    name: "TvShowCast",
    definition(t) {
        t.nonNull.boolean("adult");
        t.int("gender");
        t.nonNull.int("id");
        t.nonNull.string("known_for_department");
        t.nonNull.string("name");
        t.nonNull.string("original_name");
        t.nonNull.float("popularity");
        t.string("profile_path");
        t.nonNull.string("character");
        t.nonNull.string("credit_id");
        t.nonNull.int("order");
    },
});

const tvShowCrew = objectType({
    name: "TvShowCrew",
    definition(t) {
        t.nonNull.boolean("adult");
        t.int("gender");
        t.nonNull.int("id");
        t.nonNull.string("known_for_department");
        t.nonNull.string("name");
        t.nonNull.string("original_name");
        t.nonNull.float("popularity");
        t.string("profile_path");
        t.nonNull.string("credit_id");
        t.nonNull.string("department");
        t.nonNull.string("job");
    },
});






const tvShowResults = objectType({
    name: "TvShowResults",
    definition(t) {
        t.nonNull.int("page");
        t.nonNull.list.field("results", { type: tvShow });
        t.nonNull.int("total_pages");
        t.nonNull.int("total_results");
    },
});

const tvShow = objectType({
    name: "TvShow",
    definition(t) {
        t.string("poster_path");
        t.nonNull.float("popularity");
        t.nonNull.int("id");
        t.string("backdrop_path");
        t.nonNull.float("vote_average");
        t.nonNull.string("overview");
        t.nonNull.string("first_air_date");
        t.nonNull.list.field("origin_country", { type: "String" });
        t.nonNull.list.field("genre_ids", { type: "Int" });
        t.nonNull.string("original_language");
        t.nonNull.int("vote_count");
        t.nonNull.string("name");
        t.nonNull.string("original_name");
    },
});
