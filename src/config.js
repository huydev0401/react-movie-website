// https://api.themoviedb.org/3/movie/now_playing?api_key=2fcb8a94f56d2bd408dda09d36e46ce7
// https://image.tmdb.org/t/p/w500/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API_KEY = "2fcb8a94f56d2bd408dda09d36e46ce7";
const TMDB_ENDPOINT = "https://api.themoviedb.org/3/movie";
const TMDB_SEARCH_ENDPOINT = "https://api.themoviedb.org/3/search/movie";
export const TMDB_API = {
  getMovieList: (type, page = 1) =>
    `${TMDB_ENDPOINT}/${type}?api_key=${API_KEY}&page=${page}`,
  getMovieDetails: (movieId) =>
    `${TMDB_ENDPOINT}/${movieId}?api_key=${API_KEY}`,
  getMovieInfo: (movieId, type) =>
    `${TMDB_ENDPOINT}/${movieId}/${type}?api_key=${API_KEY}`,
  getMovieSearch: (query, page) =>
    `${TMDB_SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${query}&page=${page}`,
  getImages: (url, width) => `https://image.tmdb.org/t/p/${width}/${url}`,
};
