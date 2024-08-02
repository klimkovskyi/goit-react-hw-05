import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGE5Zjg0ZTQ4ZjBiYTM3ZGRlMjA1ODU2ODFlNzcwNyIsIm5iZiI6MTcyMjUxMjY2Ny4xMTM1MjMsInN1YiI6IjY2YWI3MzZiNTYzOGJjYmZmMWMwMWM1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JnlnpW4gI13X67tcFqvCgO0ksLekReSJ-aljHFRTT-A",
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      "trending/movie/day?language=en-US",
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Trending Movies", error);
    throw error;
  }
};

export const fetchMovieDetail = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching Movies Detail", error);
    throw error;
  }
};

export const fetchSearchMovie = async query => {
  try {
    const response = await axios.get("search/movie", {
      ...options,
      params: { query: query, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Movies", error);
    throw error;
  }
};

export const fetchMovieCast = async movie_id => {
  try {
    const response = await axios.get(
      `movie/${movie_id}/credits?language=en-US`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Movies Cast", error);
    throw error;
  }
};

export const fetchMovieReviews = async movie_id => {
  try {
    const response = await axios.get(`movie/${movie_id}/reviews`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};
