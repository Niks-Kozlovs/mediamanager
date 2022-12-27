import { extendType, intArg, list, nonNull, objectType, stringArg } from "nexus";
import { makeRequest } from "../../utils/makeRequest";
import { addTVShowToWatchedResolver, getWatchedTVShowsResolver, removeTVShowFromWatchedResolver } from "../resolvers/watchedTVShows";
import { addTVShowToWatchLaterResolver, getWatchLaterTVShowsResolver, removeTVShowFromWatchLaterResolver } from "../resolvers/tvShowWatchlist";
import { addTVShowToFavoritesResolver, getTVShowFavoritesResolver, removeTVShowFromFavoritesResolver } from "../resolvers/tvShowFavourites";

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

export const addTVShowToWatched = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("addTVShowToWatched", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: addTVShowToWatchedResolver,
        });
    },
});

export const removeTVShowFromWatched = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("removeTVShowFromWatched", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: removeTVShowFromWatchedResolver,
        });
    },
});

export const getWatchedTVShows = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getWatchedTVShows", {
            type: tvShowResults,
            resolve: getWatchedTVShowsResolver,
        });
    },
});

export const addTVShowToWatchLater = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("addTVShowToWatchLater", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: addTVShowToWatchLaterResolver,
        });
    },
});

export const removeTVShowFromWatchLater = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("removeTVShowFromWatchLater", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: removeTVShowFromWatchLaterResolver,
        });
    },
});

export const getTVShowWatchLater = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTVShowWatchLater", {
            type: list(tvShow),
            resolve: getWatchLaterTVShowsResolver,
        });
    },
});

export const addTVShowToFavorites = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("addTVShowToFavorites", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: addTVShowToFavoritesResolver,
        });
    },
});

export const removeTVShowFromFavorites = extendType({
    type: "Mutation",
    definition: (t) => {
        t.field("removeTVShowFromFavorites", {
            type: "Boolean",
            args: { tvShowId: nonNull(stringArg()) },
            resolve: removeTVShowFromFavoritesResolver,
        });
    },
});

export const getTVShowFavorites = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTVShowFavorites", {
            type: tvShowResults,
            resolve: getTVShowFavoritesResolver,
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
