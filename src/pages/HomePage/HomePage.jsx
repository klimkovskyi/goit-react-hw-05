import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadingTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadingTrendingMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !movies) {
    return <p>Error: Failed to fetch movies</p>;
  }
  return (
    <div>
      <h1 className={s.title}>The Best Today:</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
