import { FieldResolver } from "nexus";
import { getUserFromCookie } from "./loginAttempt";

// export const getMovieWatchList: FieldResolver<"Query", "getMovieWatchlist"> = async (_, __, ctx) => {
//     const user = await getUserFromCookie(ctx);
//                 const { prisma } = ctx;
//                 const watchlist = await prisma.movieWatchList.findMany({
//                     where: {
//                         user_id: user.id,
//                     },
//                     select: {
//                         movie_id: true,
//                     },
//                 });

//                 const movieIds = watchlist.map((movie) => movie.movie_id);

//                 const movieDetails = await prisma.movieDetails.findMany({
//                     where: {
//                         movie_id: {
//                             in: movieIds,
//                         },
//                     },
//                 });

//                 return movieDetails.map((movie) => ({
//                     movie_id: movie.movie_id,
//                     poster_path: movie.poster_path,
//                     overview: movie.overview,
//                     release_date: movie.release_date,
//                     title: movie.title,
//                     backdrop_path: movie.backdrop_path,
//                     original_title: movie.original_title,
//                     }));
// }