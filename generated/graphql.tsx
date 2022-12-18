import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cast = {
  __typename?: 'Cast';
  adult: Scalars['Boolean'];
  cast_id: Scalars['Int'];
  character: Scalars['String'];
  credit_id: Scalars['String'];
  gender?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  known_for_department: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  original_name: Scalars['String'];
  popularity: Scalars['Float'];
  profile_path?: Maybe<Scalars['String']>;
};

export type ExtendedMovieData = {
  __typename?: 'ExtendedMovieData';
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  budget: Scalars['Int'];
  genre_ids?: Maybe<Array<Scalars['Int']>>;
  genres: Array<Maybe<Genre>>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imdb_id?: Maybe<Scalars['String']>;
  original_language: Scalars['String'];
  original_title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  popularity: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
  release_date: Scalars['String'];
  revenue: Scalars['Int'];
  runtime?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  video: Scalars['Boolean'];
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Scalars['Int']>>;
  id: Scalars['Int'];
  original_language: Scalars['String'];
  original_title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  popularity: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
  release_date: Scalars['String'];
  title: Scalars['String'];
  video: Scalars['Boolean'];
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
};

export type MovieCredits = {
  __typename?: 'MovieCredits';
  cast?: Maybe<Array<Cast>>;
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovieToWatchlist?: Maybe<Scalars['Boolean']>;
  createAccount?: Maybe<RegisterResponse>;
  login?: Maybe<LoginResponse>;
  removeMovieFromWatchlist?: Maybe<Scalars['Boolean']>;
};


export type MutationAddMovieToWatchlistArgs = {
  movieId: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  credentials: RegisterCredentials;
};


export type MutationLoginArgs = {
  credentials: LoginCredentials;
};


export type MutationRemoveMovieFromWatchlistArgs = {
  movieId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAiringTodayTvShows?: Maybe<TvShowResults>;
  getAringSoonTvShows?: Maybe<TvShowResults>;
  getMovieCredits?: Maybe<MovieCredits>;
  getMovieDetails?: Maybe<ExtendedMovieData>;
  getMovieRecomendations?: Maybe<MovieResults>;
  getMovieWatchlist?: Maybe<Array<Maybe<SimpleMovie>>>;
  getNowPlaying?: Maybe<MovieResults>;
  getPopularMovies?: Maybe<MovieResults>;
  getPopularTvShows?: Maybe<TvShowResults>;
  getSimilarMovies?: Maybe<MovieResults>;
  getSimilarTvShows?: Maybe<TvShowResults>;
  getTopRated?: Maybe<MovieResults>;
  getTopRatedTvShows?: Maybe<TvShowResults>;
  getTvShowAggregateCredits?: Maybe<TvShowCredits>;
  getTvShowCredits?: Maybe<TvShowCredits>;
  getTvShowRecommendations?: Maybe<TvShowResults>;
  getUpcoming?: Maybe<MovieResults>;
  searchMovies?: Maybe<MovieResults>;
};


export type QueryGetMovieCreditsArgs = {
  movieId: Scalars['Int'];
};


export type QueryGetMovieDetailsArgs = {
  movieId: Scalars['Int'];
};


export type QueryGetMovieRecomendationsArgs = {
  movieId: Scalars['Int'];
};


export type QueryGetSimilarMoviesArgs = {
  movieId: Scalars['Int'];
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSimilarTvShowsArgs = {
  tvShowId: Scalars['Int'];
};


export type QueryGetTvShowAggregateCreditsArgs = {
  tvShowId: Scalars['Int'];
};


export type QueryGetTvShowCreditsArgs = {
  tvShowId: Scalars['Int'];
};


export type QueryGetTvShowRecommendationsArgs = {
  tvShowId: Scalars['Int'];
};


export type QuerySearchMoviesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};

export type SimpleMovie = {
  __typename?: 'SimpleMovie';
  backdrop_path?: Maybe<Scalars['String']>;
  movie_id: Scalars['String'];
  original_title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  release_date: Scalars['String'];
  title: Scalars['String'];
};

export type TvShow = {
  __typename?: 'TvShow';
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date: Scalars['String'];
  genre_ids: Array<Maybe<Scalars['Int']>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  origin_country: Array<Maybe<Scalars['String']>>;
  original_language: Scalars['String'];
  original_name: Scalars['String'];
  overview: Scalars['String'];
  popularity: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
};

export type TvShowCast = {
  __typename?: 'TvShowCast';
  adult: Scalars['Boolean'];
  character: Scalars['String'];
  credit_id: Scalars['String'];
  gender?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  known_for_department: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  original_name: Scalars['String'];
  popularity: Scalars['Float'];
  profile_path?: Maybe<Scalars['String']>;
};

export type TvShowCredits = {
  __typename?: 'TvShowCredits';
  cast: Array<Maybe<TvShowCast>>;
  crew: Array<Maybe<TvShowCrew>>;
  id: Scalars['Int'];
};

export type TvShowCrew = {
  __typename?: 'TvShowCrew';
  adult: Scalars['Boolean'];
  credit_id: Scalars['String'];
  department: Scalars['String'];
  gender?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  job: Scalars['String'];
  known_for_department: Scalars['String'];
  name: Scalars['String'];
  original_name: Scalars['String'];
  popularity: Scalars['Float'];
  profile_path?: Maybe<Scalars['String']>;
};

export type TvShowResults = {
  __typename?: 'TvShowResults';
  page: Scalars['Int'];
  results: Array<Maybe<TvShow>>;
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export type LoginCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'loginResponse';
  username?: Maybe<Scalars['String']>;
};

export type MovieResults = {
  __typename?: 'movieResults';
  page: Scalars['String'];
  results?: Maybe<Array<Movie>>;
  total_pages: Scalars['String'];
  total_results: Scalars['String'];
};

export type RegisterCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'registerResponse';
  message: Scalars['String'];
};

export type RegisterAccountMutationVariables = Exact<{
  credentials: RegisterCredentials;
}>;


export type RegisterAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'registerResponse', message: string } | null };

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'loginResponse', username?: string | null } | null };


export const RegisterAccountDocument = gql`
    mutation RegisterAccount($credentials: registerCredentials!) {
  createAccount(credentials: $credentials) {
    message
  }
}
    `;
export type RegisterAccountMutationFn = Apollo.MutationFunction<RegisterAccountMutation, RegisterAccountMutationVariables>;

/**
 * __useRegisterAccountMutation__
 *
 * To run a mutation, you first call `useRegisterAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAccountMutation, { data, loading, error }] = useRegisterAccountMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useRegisterAccountMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAccountMutation, RegisterAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAccountMutation, RegisterAccountMutationVariables>(RegisterAccountDocument, options);
      }
export type RegisterAccountMutationHookResult = ReturnType<typeof useRegisterAccountMutation>;
export type RegisterAccountMutationResult = Apollo.MutationResult<RegisterAccountMutation>;
export type RegisterAccountMutationOptions = Apollo.BaseMutationOptions<RegisterAccountMutation, RegisterAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: loginCredentials!) {
  login(credentials: $credentials) {
    username
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;