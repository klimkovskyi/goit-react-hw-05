import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetail } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    const loadingMovieDetail = async () => {
      try {
        const movieDetail = await fetchMovieDetail(params.movieId);
        setMovie(movieDetail);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadingMovieDetail();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className={s.wrapper}>
        <Link className={s.goback} to={backLinkHref}>
          ← Go back
        </Link>
        <div className={s.img}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <ul className={s.list}>
          <li>
            <h2>{movie.title}</h2>
          </li>
          <li>
            <p>Release: {movie.release_date}</p>
          </li>
          <li>
            <p>Popularity: {movie.popularity}</p>
          </li>
          <li>
            <p>Runtime: {movie.runtime} min</p>
          </li>
          <li>
            <h3>Genres:</h3>
            <ul className={s.genres_list}>
              {movie.genres.map(gener => (
                <li key={gener.id}>{gener.name}</li>
              ))}
            </ul>
          </li>
          <li>
            <h3>Overview:</h3>
            <p>{movie.overview}</p>
          </li>
          <li>
            <h4>
              Rating of the viewers: {movie.vote_average} ({movie.vote_count}{" "}
              votes)
            </h4>
          </li>
        </ul>
      </div>
      <nav>
        <ul className={s.btn_list}>
          <li className={s.btn_item}>
            <Link
              className={s.btn_link}
              to="cast"
              state={{ from: location.state?.from }}
            >
              Cast
            </Link>
          </li>
          <li className={s.btn_item}>
            <Link
              className={s.btn_link}
              to="reviews"
              state={{ from: location.state?.from }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
