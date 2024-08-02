import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await fetchSearchMovie(query);
          setMovies(response.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const newQuery = form.elements.query.value.trim();
    if (newQuery !== query) {
      setSearchQuery({ query: newQuery });
    }
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input name="query" type="search" placeholder="Search movies...." />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length === 0 && query && !loading && (
        <h1>We can&apos;t find anything. Please try again...</h1>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
