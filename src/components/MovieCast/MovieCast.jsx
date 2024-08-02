import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieCast = async () => {
      try {
        const res = await fetchMovieCast(movieId);
        setCast(res.cast);
      } catch (error) {
        setError(error.massege);
      } finally {
        setLoading(false);
      }
    };
    loadMovieCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Cast:</h2>
      <ul className={s.list}>
        {cast.map(actor => (
          <li className={s.item} key={actor.cast_id}>
            <p>
              {actor.name} as {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
