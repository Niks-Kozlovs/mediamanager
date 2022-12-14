import { extendType, intArg, nonNull, objectType, stringArg } from "nexus"
import { makeRequest } from "../../utils/makeRequest";

export const getPopularMovies = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getPopularMovies", {
            type: movieResults,
            resolve: async () => await makeRequest("movie/popular"),
        });
    },
});

export const getMovieRecomendations = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getMovieRecomendations", {
            type: movieResults,
            args: { movieId: nonNull(intArg())},
            resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}/recommendations`),
        });
    },
});

export const getSimilarMovies = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getSimilarMovies", {
            type: movieResults,
            args: { movieId: nonNull(intArg()), page: intArg()},
            resolve: async (_, { movieId, page }) => await makeRequest(`movie/${movieId}/similar`, { page: page || 1 }),
        });
    },
});

export const getNowPlaying = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getNowPlaying", {
            type: movieResults,
            resolve: async () => await makeRequest("movie/now_playing"),
        });
    },
});

export const getTopRated = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getTopRated", {
            type: movieResults,
            resolve: async () => await makeRequest("movie/top_rated"),
        });
    },
});

export const getUpcoming = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getUpcoming", {
            type: movieResults,
            resolve: async () => await makeRequest("movie/upcoming"),
        });
    },
});

export const getMovieDetails = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getMovieDetails", {
            type: ExtendedMovieData,
            args: { movieId: nonNull(intArg())},
            resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}`),
        })
    },
});

export const searchMovies = extendType({
    type: "Query",
    definition: (t) => {
        t.field("searchMovies", {
            type: movieResults,
            args: { query: nonNull(stringArg()), page: intArg() },
            resolve: async (_, { query, page }) => {
                const encodedQuery = encodeURIComponent(query);
                return await makeRequest('search/movie', { query: encodedQuery, page: page || 1 });
            },
        });
    },
});

export const getMovieCredits = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getMovieCredits", {
            type: MovieCredits,
            args: { movieId: nonNull(intArg())},
            resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}/credits`),
        });
    },
});


const MovieCredits = objectType({
    name: "MovieCredits",
    definition: (t) => {
        t.nonNull.int("id");
        t.list.nonNull.field("cast", {
            type: Cast
        });
    },
});

const Cast = objectType({
    name: "Cast",
    definition: (t) => {
        t.nonNull.boolean("adult");
        t.int("gender");
        t.nonNull.int("id");
        t.nonNull.string("known_for_department");
        t.nonNull.string("name");
        t.nonNull.string("original_name");
        t.nonNull.float("popularity");
        t.string("profile_path");
        t.nonNull.int("cast_id");
        t.nonNull.string("character");
        t.nonNull.string("credit_id");
        t.nonNull.int("order");
    },
});



const movieResults = objectType({
    name: "movieResults",
    definition: (t) => {
        t.nonNull.string("page");
        t.nonNull.string("total_results");
        t.nonNull.string("total_pages");
        t.list.nonNull.field("results", {
            type: Movie
        });
    },
});

const Genre = objectType({
    name: "Genre",
    definition: (t) => {
        t.nonNull.int("id");
        t.nonNull.string("name");
    },
});

const ExtendedMovieData = objectType({
    name: "ExtendedMovieData",
    definition: (t) => {
        // t.field("belongs_to_collection", {});
        t.nonNull.int("budget");
        t.nonNull.list.field("genres", {
            type: Genre
        });
        t.string("homepage");
        t.string("imdb_id");
        // t.nonNull.list.field("production_companies", {});
        // t.nonNull.list.field("production_countries", {});
        t.nonNull.int("revenue");
        t.int("runtime");
        // t.nonNull.list.field("spoken_languages", {});
        t.nonNull.string("status");
        t.string("tagline");
        t.string("poster_path");
        t.nonNull.boolean("adult");
        t.string("overview");
        t.nonNull.string("release_date");
        t.list.nonNull.field("genre_ids", {
            type: "Int"
        });
        t.nonNull.int("id");
        t.nonNull.string("original_title");
        t.nonNull.string("original_language");
        t.nonNull.string("title");
        t.string("backdrop_path");
        t.nonNull.float("popularity");
        t.nonNull.int("vote_count");
        t.nonNull.boolean("video");
        t.nonNull.float("vote_average");
    },
});

const Movie = objectType({
    name: "Movie",
    definition: (t) => {
        t.string("poster_path");
        t.nonNull.boolean("adult");
        t.string("overview");
        t.nonNull.string("release_date");
        t.list.nonNull.field("genre_ids", {
            type: "Int"
        });
        t.nonNull.int("id");
        t.nonNull.string("original_title");
        t.nonNull.string("original_language");
        t.nonNull.string("title");
        t.string("backdrop_path");
        t.nonNull.float("popularity");
        t.nonNull.int("vote_count");
        t.nonNull.boolean("video");
        t.nonNull.float("vote_average");
    },
});

