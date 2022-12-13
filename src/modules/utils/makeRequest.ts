const rootPath = "https://api.themoviedb.org/3/";

export const makeRequest = async (path: string) => {
  const response = await fetch(rootPath + path +`?api_key=${process.env.TMDB_ACCESS_TOKEN}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};
