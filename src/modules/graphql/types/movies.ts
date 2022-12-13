import { extendType, objectType } from "nexus"
import { requestPopularMovies } from "../resolvers/requestPopularMovies"

export const getPopularMovies = extendType({
    type: "Query",
    definition: (t) => {
        t.field("getPopularMovies", {
            type: movieResults,
            resolve: requestPopularMovies,
        });
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

const Movie = objectType({
    name: "Movie",
    definition: (t) => {
        t.string("poster_path");
        t.nonNull.boolean("adult");
        t.nonNull.string("overview");
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

