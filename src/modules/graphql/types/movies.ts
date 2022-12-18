import { FieldResolver, intArg, list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus"
import { makeRequest } from "../../utils/makeRequest";
import { getUserFromCookie } from "../resolvers/loginAttempt";
// import { getMovieWatchList } from "../resolvers/moviesWatchList";

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

const Genre = objectType({
    name: "Genre",
    definition: (t) => {
        t.nonNull.int("id");
        t.nonNull.string("name");
    },
});

const SimpleMovie = objectType({
    name: "SimpleMovie",
    definition: (t) => {
        t.nonNull.string("movie_id");
        t.string("poster_path");
        t.string("overview");
        t.nonNull.string("release_date");
        t.nonNull.string("original_title");
        t.nonNull.string("title");
        t.string("backdrop_path");
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

const MovieResults = objectType({
    name: "MovieResults",
    definition: (t) => {
        t.nonNull.string("page");
        t.nonNull.string("total_results");
        t.nonNull.string("total_pages");
        t.list.nonNull.field("results", {
            type: Movie
        });
    },
});

const ExtendedMovieData = objectType({
    name: "ExtendedMovieData",
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

export const getPopularMovies = queryField("getPopularMovies", {
    type: MovieResults,
    resolve: async () => await makeRequest("movie/popular"),
});

export const getMovieRecomendations = queryField("getMovieRecomendations", {
    type: MovieResults,
    args: { movieId: nonNull(intArg())},
    resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}/recommendations`),
});

export const getSimilarMovies = queryField("getSimilarMovies", {
    type: MovieResults,
    args: { movieId: nonNull(intArg()), page: intArg()},
    resolve: async (_, { movieId, page }) => await makeRequest(`movie/${movieId}/similar`, { page: page || 1 }),
});

export const getNowPlaying = queryField("getNowPlaying", {
    type: MovieResults,
    resolve: async () => await makeRequest("movie/now_playing"),
});

export const getTopRated = queryField("getTopRated", {
    type: MovieResults,
    resolve: async () => await makeRequest("movie/top_rated"),
});

export const getUpcoming = queryField("getUpcoming", {
    type: MovieResults,
    resolve: async () => await makeRequest("movie/upcoming"),
});

export const getMovieDetails = queryField("getMovieDetails", {
    type: ExtendedMovieData,
    args: { movieId: nonNull(intArg())},
    resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}`),
});

export const searchMovies = queryField("searchMovies", {
    type: MovieResults,
    args: { query: nonNull(stringArg()), page: intArg() },
    resolve: async (_, { query, page }) => {
        const encodedQuery = encodeURIComponent(query);
        return await makeRequest('search/movie', { query: encodedQuery, page: page || 1 });
    },
});

export const getMovieCredits = queryField("getMovieCredits", {
    type: MovieCredits,
    args: { movieId: nonNull(intArg())},
    resolve: async (_, { movieId }) => await makeRequest(`movie/${movieId}/credits`),
});

export const addMovieToWatchlist = mutationField("addMovieToWatchlist", {
    type: "Boolean",
    args: { movieId: nonNull(stringArg())},
    resolve: async (_, { movieId }, ctx) => {
        const user = await getUserFromCookie(ctx);
        const { prisma } = ctx;

        const movieDetails = await prisma.movieDetails.findFirst({
            where: {
                movie_id: movieId,
            },
            select: {
                movie_id: true,
            }
        });

        if (!movieDetails) {
            const movieDetails = await makeRequest(`movie/${movieId}`);
            await prisma.movieDetails.create({
                data: {
                    movie_id: movieDetails.id.toString(),
                    poster_path: movieDetails.poster_path,
                    overview: movieDetails.overview,
                    release_date: movieDetails.release_date,
                    original_title: movieDetails.original_title,
                    title: movieDetails.title,
                    backdrop_path: movieDetails.backdrop_path,
                },
            });
        }

        await prisma.movieWatchList.create({
            data: {
                user_id: user.id,
                movie_id: movieId,
            },
        });

        return true;
    },
});

export const removeMovieFromWatchlist = mutationField("removeMovieFromWatchlist", {
    type: "Boolean",
    args: { movieId: nonNull(stringArg())},
    resolve: async (_, { movieId }, ctx) => {
        const user = await getUserFromCookie(ctx);
        const { prisma } = ctx;
        const watchlistMovie = await prisma.movieWatchList.findFirst({
            where: {
                user_id: user.id,
                movie_id: movieId,
            },
        });

        if (!watchlistMovie) {
            return false;
        }

        await prisma.movieWatchList.delete({
            where: {
                id: watchlistMovie.id,
            },
        });

        return true;
    },
});

export const getMovieWatchlist = queryField("getMovieWatchlist", {
    type: list(SimpleMovie),
    //@ts-ignore
    resolve: async (_, __, ctx) => {
        const user = await getUserFromCookie(ctx);
        const { prisma } = ctx;

        const watchlist = await prisma.movieWatchList.findMany({
            where: {
                user_id: user.id,
            },
            include: {
                movieDetails: true,
            }
        });

        const list = watchlist.map(({ movieDetails: md }) => md);

        return list;
    },
});
