const API_KEY= "94a9b8054c982f62cd6f9fc47ab1227";
const BASE_URL = "https://api.themoviedb.org/3";
// 94a9b8054c982f62cd6f9fc47ab1227e
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
