/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../src/types/Context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  loginCredentials: { // input type
    email: string; // String!
    password: string; // String!
  }
  registerCredentials: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  Cast: { // root type
    adult: boolean; // Boolean!
    cast_id: number; // Int!
    character: string; // String!
    credit_id: string; // String!
    gender?: number | null; // Int
    id: number; // Int!
    known_for_department: string; // String!
    name: string; // String!
    order: number; // Int!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path?: string | null; // String
  }
  ExtendedMovieData: { // root type
    adult: boolean; // Boolean!
    backdrop_path?: string | null; // String
    budget: number; // Int!
    genre_ids?: number[] | null; // [Int!]
    genres: Array<NexusGenRootTypes['Genre'] | null>; // [Genre]!
    homepage?: string | null; // String
    id: number; // Int!
    imdb_id?: string | null; // String
    original_language: string; // String!
    original_title: string; // String!
    overview?: string | null; // String
    popularity: number; // Float!
    poster_path?: string | null; // String
    release_date: string; // String!
    revenue: number; // Int!
    runtime?: number | null; // Int
    status: string; // String!
    tagline?: string | null; // String
    title: string; // String!
    video: boolean; // Boolean!
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  Genre: { // root type
    id: number; // Int!
    name: string; // String!
  }
  MediaUpdate: { // root type
    date?: NexusGenScalars['Date'] | null; // Date
    id?: string | null; // String
    image?: string | null; // String
    name?: string | null; // String
    type?: string | null; // String
  }
  Movie: { // root type
    adult: boolean; // Boolean!
    backdrop_path?: string | null; // String
    genre_ids?: number[] | null; // [Int!]
    id: string; // String!
    original_language: string; // String!
    original_title: string; // String!
    overview?: string | null; // String
    popularity: number; // Float!
    poster_path?: string | null; // String
    release_date: string; // String!
    title: string; // String!
    video: boolean; // Boolean!
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  MovieCredits: { // root type
    cast?: NexusGenRootTypes['Cast'][] | null; // [Cast!]
    id: number; // Int!
  }
  MovieResults: { // root type
    page: string; // String!
    results?: NexusGenRootTypes['Movie'][] | null; // [Movie!]
    total_pages: string; // String!
    total_results: string; // String!
  }
  Mutation: {};
  Query: {};
  TvShow: { // root type
    backdrop_path?: string | null; // String
    first_air_date: string; // String!
    genre_ids: Array<number | null>; // [Int]!
    id: number; // Int!
    name: string; // String!
    origin_country: Array<string | null>; // [String]!
    original_language: string; // String!
    original_name: string; // String!
    overview: string; // String!
    popularity: number; // Float!
    poster_path?: string | null; // String
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  TvShowCast: { // root type
    adult: boolean; // Boolean!
    character: string; // String!
    credit_id: string; // String!
    gender?: number | null; // Int
    id: number; // Int!
    known_for_department: string; // String!
    name: string; // String!
    order: number; // Int!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path?: string | null; // String
  }
  TvShowCredits: { // root type
    cast: Array<NexusGenRootTypes['TvShowCast'] | null>; // [TvShowCast]!
    crew: Array<NexusGenRootTypes['TvShowCrew'] | null>; // [TvShowCrew]!
    id: number; // Int!
  }
  TvShowCrew: { // root type
    adult: boolean; // Boolean!
    credit_id: string; // String!
    department: string; // String!
    gender?: number | null; // Int
    id: number; // Int!
    job: string; // String!
    known_for_department: string; // String!
    name: string; // String!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path?: string | null; // String
  }
  TvShowResults: { // root type
    page: number; // Int!
    results: Array<NexusGenRootTypes['TvShow'] | null>; // [TvShow]!
    total_pages: number; // Int!
    total_results: number; // Int!
  }
  loginResponse: { // root type
    username?: string | null; // String
  }
  registerResponse: { // root type
    message: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Cast: { // field return type
    adult: boolean; // Boolean!
    cast_id: number; // Int!
    character: string; // String!
    credit_id: string; // String!
    gender: number | null; // Int
    id: number; // Int!
    known_for_department: string; // String!
    name: string; // String!
    order: number; // Int!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path: string | null; // String
  }
  ExtendedMovieData: { // field return type
    adult: boolean; // Boolean!
    backdrop_path: string | null; // String
    budget: number; // Int!
    genre_ids: number[] | null; // [Int!]
    genres: Array<NexusGenRootTypes['Genre'] | null>; // [Genre]!
    homepage: string | null; // String
    id: number; // Int!
    imdb_id: string | null; // String
    original_language: string; // String!
    original_title: string; // String!
    overview: string | null; // String
    popularity: number; // Float!
    poster_path: string | null; // String
    release_date: string; // String!
    revenue: number; // Int!
    runtime: number | null; // Int
    status: string; // String!
    tagline: string | null; // String
    title: string; // String!
    video: boolean; // Boolean!
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  Genre: { // field return type
    id: number; // Int!
    name: string; // String!
  }
  MediaUpdate: { // field return type
    date: NexusGenScalars['Date'] | null; // Date
    id: string | null; // String
    image: string | null; // String
    name: string | null; // String
    type: string | null; // String
  }
  Movie: { // field return type
    adult: boolean; // Boolean!
    backdrop_path: string | null; // String
    genre_ids: number[] | null; // [Int!]
    id: string; // String!
    original_language: string; // String!
    original_title: string; // String!
    overview: string | null; // String
    popularity: number; // Float!
    poster_path: string | null; // String
    release_date: string; // String!
    title: string; // String!
    video: boolean; // Boolean!
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  MovieCredits: { // field return type
    cast: NexusGenRootTypes['Cast'][] | null; // [Cast!]
    id: number; // Int!
  }
  MovieResults: { // field return type
    page: string; // String!
    results: NexusGenRootTypes['Movie'][] | null; // [Movie!]
    total_pages: string; // String!
    total_results: string; // String!
  }
  Mutation: { // field return type
    addMovieToFavourites: boolean | null; // Boolean
    addMovieToWatched: boolean | null; // Boolean
    addMovieToWatchlist: boolean | null; // Boolean
    addTVShowToFavorites: boolean | null; // Boolean
    addTVShowToWatchLater: boolean | null; // Boolean
    addTVShowToWatched: boolean | null; // Boolean
    createAccount: NexusGenRootTypes['registerResponse'] | null; // registerResponse
    login: NexusGenRootTypes['loginResponse'] | null; // loginResponse
    removeMovieFromFavourites: boolean | null; // Boolean
    removeMovieFromWatched: boolean | null; // Boolean
    removeMovieFromWatchlist: boolean | null; // Boolean
    removeTVShowFromFavorites: boolean | null; // Boolean
    removeTVShowFromWatchLater: boolean | null; // Boolean
    removeTVShowFromWatched: boolean | null; // Boolean
  }
  Query: { // field return type
    getAiringTodayTvShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getAringSoonTvShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getMediaUpdates: Array<NexusGenRootTypes['MediaUpdate'] | null> | null; // [MediaUpdate]
    getMovieCredits: NexusGenRootTypes['MovieCredits'] | null; // MovieCredits
    getMovieDetails: NexusGenRootTypes['ExtendedMovieData'] | null; // ExtendedMovieData
    getMovieFavourites: Array<NexusGenRootTypes['Movie'] | null> | null; // [Movie]
    getMovieRecomendations: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getMovieWatchlist: Array<NexusGenRootTypes['Movie'] | null> | null; // [Movie]
    getNowPlaying: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getPopularMovies: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getPopularTvShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getSimilarMovies: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getSimilarTvShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getTVShowFavorites: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getTVShowWatchLater: Array<NexusGenRootTypes['TvShow'] | null> | null; // [TvShow]
    getTopRated: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getTopRatedTvShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getTvShowAggregateCredits: NexusGenRootTypes['TvShowCredits'] | null; // TvShowCredits
    getTvShowCredits: NexusGenRootTypes['TvShowCredits'] | null; // TvShowCredits
    getTvShowRecommendations: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    getUpcoming: NexusGenRootTypes['MovieResults'] | null; // MovieResults
    getWatchedMovies: Array<NexusGenRootTypes['Movie'] | null> | null; // [Movie]
    getWatchedTVShows: NexusGenRootTypes['TvShowResults'] | null; // TvShowResults
    searchMovies: NexusGenRootTypes['MovieResults'] | null; // MovieResults
  }
  TvShow: { // field return type
    backdrop_path: string | null; // String
    first_air_date: string; // String!
    genre_ids: Array<number | null>; // [Int]!
    id: number; // Int!
    name: string; // String!
    origin_country: Array<string | null>; // [String]!
    original_language: string; // String!
    original_name: string; // String!
    overview: string; // String!
    popularity: number; // Float!
    poster_path: string | null; // String
    vote_average: number; // Float!
    vote_count: number; // Int!
  }
  TvShowCast: { // field return type
    adult: boolean; // Boolean!
    character: string; // String!
    credit_id: string; // String!
    gender: number | null; // Int
    id: number; // Int!
    known_for_department: string; // String!
    name: string; // String!
    order: number; // Int!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path: string | null; // String
  }
  TvShowCredits: { // field return type
    cast: Array<NexusGenRootTypes['TvShowCast'] | null>; // [TvShowCast]!
    crew: Array<NexusGenRootTypes['TvShowCrew'] | null>; // [TvShowCrew]!
    id: number; // Int!
  }
  TvShowCrew: { // field return type
    adult: boolean; // Boolean!
    credit_id: string; // String!
    department: string; // String!
    gender: number | null; // Int
    id: number; // Int!
    job: string; // String!
    known_for_department: string; // String!
    name: string; // String!
    original_name: string; // String!
    popularity: number; // Float!
    profile_path: string | null; // String
  }
  TvShowResults: { // field return type
    page: number; // Int!
    results: Array<NexusGenRootTypes['TvShow'] | null>; // [TvShow]!
    total_pages: number; // Int!
    total_results: number; // Int!
  }
  loginResponse: { // field return type
    username: string | null; // String
  }
  registerResponse: { // field return type
    message: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Cast: { // field return type name
    adult: 'Boolean'
    cast_id: 'Int'
    character: 'String'
    credit_id: 'String'
    gender: 'Int'
    id: 'Int'
    known_for_department: 'String'
    name: 'String'
    order: 'Int'
    original_name: 'String'
    popularity: 'Float'
    profile_path: 'String'
  }
  ExtendedMovieData: { // field return type name
    adult: 'Boolean'
    backdrop_path: 'String'
    budget: 'Int'
    genre_ids: 'Int'
    genres: 'Genre'
    homepage: 'String'
    id: 'Int'
    imdb_id: 'String'
    original_language: 'String'
    original_title: 'String'
    overview: 'String'
    popularity: 'Float'
    poster_path: 'String'
    release_date: 'String'
    revenue: 'Int'
    runtime: 'Int'
    status: 'String'
    tagline: 'String'
    title: 'String'
    video: 'Boolean'
    vote_average: 'Float'
    vote_count: 'Int'
  }
  Genre: { // field return type name
    id: 'Int'
    name: 'String'
  }
  MediaUpdate: { // field return type name
    date: 'Date'
    id: 'String'
    image: 'String'
    name: 'String'
    type: 'String'
  }
  Movie: { // field return type name
    adult: 'Boolean'
    backdrop_path: 'String'
    genre_ids: 'Int'
    id: 'String'
    original_language: 'String'
    original_title: 'String'
    overview: 'String'
    popularity: 'Float'
    poster_path: 'String'
    release_date: 'String'
    title: 'String'
    video: 'Boolean'
    vote_average: 'Float'
    vote_count: 'Int'
  }
  MovieCredits: { // field return type name
    cast: 'Cast'
    id: 'Int'
  }
  MovieResults: { // field return type name
    page: 'String'
    results: 'Movie'
    total_pages: 'String'
    total_results: 'String'
  }
  Mutation: { // field return type name
    addMovieToFavourites: 'Boolean'
    addMovieToWatched: 'Boolean'
    addMovieToWatchlist: 'Boolean'
    addTVShowToFavorites: 'Boolean'
    addTVShowToWatchLater: 'Boolean'
    addTVShowToWatched: 'Boolean'
    createAccount: 'registerResponse'
    login: 'loginResponse'
    removeMovieFromFavourites: 'Boolean'
    removeMovieFromWatched: 'Boolean'
    removeMovieFromWatchlist: 'Boolean'
    removeTVShowFromFavorites: 'Boolean'
    removeTVShowFromWatchLater: 'Boolean'
    removeTVShowFromWatched: 'Boolean'
  }
  Query: { // field return type name
    getAiringTodayTvShows: 'TvShowResults'
    getAringSoonTvShows: 'TvShowResults'
    getMediaUpdates: 'MediaUpdate'
    getMovieCredits: 'MovieCredits'
    getMovieDetails: 'ExtendedMovieData'
    getMovieFavourites: 'Movie'
    getMovieRecomendations: 'MovieResults'
    getMovieWatchlist: 'Movie'
    getNowPlaying: 'MovieResults'
    getPopularMovies: 'MovieResults'
    getPopularTvShows: 'TvShowResults'
    getSimilarMovies: 'MovieResults'
    getSimilarTvShows: 'TvShowResults'
    getTVShowFavorites: 'TvShowResults'
    getTVShowWatchLater: 'TvShow'
    getTopRated: 'MovieResults'
    getTopRatedTvShows: 'TvShowResults'
    getTvShowAggregateCredits: 'TvShowCredits'
    getTvShowCredits: 'TvShowCredits'
    getTvShowRecommendations: 'TvShowResults'
    getUpcoming: 'MovieResults'
    getWatchedMovies: 'Movie'
    getWatchedTVShows: 'TvShowResults'
    searchMovies: 'MovieResults'
  }
  TvShow: { // field return type name
    backdrop_path: 'String'
    first_air_date: 'String'
    genre_ids: 'Int'
    id: 'Int'
    name: 'String'
    origin_country: 'String'
    original_language: 'String'
    original_name: 'String'
    overview: 'String'
    popularity: 'Float'
    poster_path: 'String'
    vote_average: 'Float'
    vote_count: 'Int'
  }
  TvShowCast: { // field return type name
    adult: 'Boolean'
    character: 'String'
    credit_id: 'String'
    gender: 'Int'
    id: 'Int'
    known_for_department: 'String'
    name: 'String'
    order: 'Int'
    original_name: 'String'
    popularity: 'Float'
    profile_path: 'String'
  }
  TvShowCredits: { // field return type name
    cast: 'TvShowCast'
    crew: 'TvShowCrew'
    id: 'Int'
  }
  TvShowCrew: { // field return type name
    adult: 'Boolean'
    credit_id: 'String'
    department: 'String'
    gender: 'Int'
    id: 'Int'
    job: 'String'
    known_for_department: 'String'
    name: 'String'
    original_name: 'String'
    popularity: 'Float'
    profile_path: 'String'
  }
  TvShowResults: { // field return type name
    page: 'Int'
    results: 'TvShow'
    total_pages: 'Int'
    total_results: 'Int'
  }
  loginResponse: { // field return type name
    username: 'String'
  }
  registerResponse: { // field return type name
    message: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addMovieToFavourites: { // args
      movieId: string; // String!
    }
    addMovieToWatched: { // args
      movieId: string; // String!
    }
    addMovieToWatchlist: { // args
      movieId: string; // String!
    }
    addTVShowToFavorites: { // args
      tvShowId: string; // String!
    }
    addTVShowToWatchLater: { // args
      tvShowId: string; // String!
    }
    addTVShowToWatched: { // args
      tvShowId: string; // String!
    }
    createAccount: { // args
      credentials: NexusGenInputs['registerCredentials']; // registerCredentials!
    }
    login: { // args
      credentials: NexusGenInputs['loginCredentials']; // loginCredentials!
    }
    removeMovieFromFavourites: { // args
      movieId: string; // String!
    }
    removeMovieFromWatched: { // args
      movieId: string; // String!
    }
    removeMovieFromWatchlist: { // args
      movieId: string; // String!
    }
    removeTVShowFromFavorites: { // args
      tvShowId: string; // String!
    }
    removeTVShowFromWatchLater: { // args
      tvShowId: string; // String!
    }
    removeTVShowFromWatched: { // args
      tvShowId: string; // String!
    }
  }
  Query: {
    getMovieCredits: { // args
      movieId: number; // Int!
    }
    getMovieDetails: { // args
      movieId: number; // Int!
    }
    getMovieRecomendations: { // args
      movieId: number; // Int!
    }
    getSimilarMovies: { // args
      movieId: number; // Int!
      page?: number | null; // Int
    }
    getSimilarTvShows: { // args
      tvShowId: number; // Int!
    }
    getTvShowAggregateCredits: { // args
      tvShowId: number; // Int!
    }
    getTvShowCredits: { // args
      tvShowId: number; // Int!
    }
    getTvShowRecommendations: { // args
      tvShowId: number; // Int!
    }
    searchMovies: { // args
      page?: number | null; // Int
      query: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}