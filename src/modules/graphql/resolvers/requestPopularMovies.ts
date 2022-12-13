import { FieldResolver } from "nexus";
import { makeRequest } from "../../utils/makeRequest";

export const requestPopularMovies: FieldResolver<"Query", "getPopularMovies"> = async () => {
    return await makeRequest("movie/popular");
};