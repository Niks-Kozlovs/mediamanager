import cron from 'node-cron';
import { prisma } from '../../lib/prisma';
import { makeRequest } from '../utils/makeRequest';
import fetch from 'node-fetch';
import { addMovieIfNotExist } from '../utils/addMovieIfNotExist';
import { Context } from '../../types/Context';
import { MovieDetails, TVDetails } from '@prisma/client';
import { addTvShowIfNotExist } from '../utils/addTvShowIfNotExist';

// @ts-ignore
globalThis.fetch = fetch;

const movieChangesKeyList = ["release_dates", "status"];
const tvChangesKeyList = ["status", "season"];

//Schedule cron to run once a day
cron.schedule('0 0 * * *', () => {
  updateMovieDetails();
  updateTVShowDetails();
});

const updateMovieDetails = async () => {
    let page = 1;
    let maxPages = 1;

    const today = new Date();
    const previousDay = new Date(today);
    previousDay.setDate(previousDay.getDate() - 1);
    const todaysDate = today.toISOString().split('T')[0];
    const previousDate = previousDay.toISOString().split('T')[0];

    do {
        const result = await makeRequest('movie/changes', {
            page: page,
            start_date: previousDate,
            end_date: todaysDate,
        });

        maxPages = result.total_pages;

        const movies = result.results.map((movie: any) => movie.id.toString());
        const savedMovies = await prisma.movieDetails.findMany({
            where: {
                movie_id: {
                    in: movies,
                },
            },
        });

        const moviesToUpdate = [] as MovieDetails[];

        savedMovies.forEach(async (movie: any) => {
            const change = await makeRequest(`movie/${movie.movie_id}/changes`, {
                start_date: previousDate,
                end_date: todaysDate,
            });

            const shouldUpdate = change.changes.some((change: any) => movieChangesKeyList.includes(change.key));

            if (shouldUpdate) {
                moviesToUpdate.push(movie);
            }
        });

        moviesToUpdate.forEach(async movie => {
            await addMovieIfNotExist(movie.movie_id, { prisma } as unknown as Context, true);
        });

    } while (page < maxPages);
};

const updateTVShowDetails = async () => {
    let page = 1;
    let maxPages = 1;

    const today = new Date();
    const previousDay = new Date(today);
    previousDay.setDate(previousDay.getDate() - 1);
    const todaysDate = today.toISOString().split('T')[0];
    const previousDate = previousDay.toISOString().split('T')[0];

    do {
        const result = await makeRequest('tv/changes', {
            page: page,
            start_date: previousDate,
            end_date: todaysDate,
        });

        maxPages = result.total_pages;

        const tvShows = result.results.map((tvShow: any) => tvShow.id.toString());
        const savedTVShows = await prisma.tVDetails.findMany({
            where: {
                tv_id: {
                    in: tvShows,
                },
            },
        });

        const tvShowsToUpdate = [] as TVDetails[];

        savedTVShows.forEach(async (tvShow: any) => {
            const change = await makeRequest(`tv/${tvShow.tv_show_id}/changes`, {
                start_date: previousDate,
                end_date: todaysDate,
            });

            const shouldUpdate = change.changes.some((change: any) => tvChangesKeyList.includes(change.key));

            if (shouldUpdate) {
                tvShowsToUpdate.push(tvShow);
            }
        });

        tvShowsToUpdate.forEach(async tvShow => {
            await addTvShowIfNotExist(tvShow.tv_id, { prisma } as unknown as Context, true);
        });
    } while (page < maxPages)
};