const rootPath = "https://api.themoviedb.org/3/";

export const makeRequest = async (path: string, parameters?: any) => {
  const parameterString = _parameterString(parameters);

  const combinedPath = rootPath + path +`?api_key=${process.env.TMDB_ACCESS_TOKEN}` + `${parameterString}`;
  console.log(combinedPath);
  const response = await fetch(combinedPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};

const _parameterString = (parameters?: any): string => {
  if (!parameters) {
    return "";
  }

  return Object.keys(parameters).reduce((acc, key) => {
    return acc + `&${key}=${parameters[key]}`;
  }, "");
};
