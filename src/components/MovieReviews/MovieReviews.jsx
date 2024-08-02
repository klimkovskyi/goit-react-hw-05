import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieReviews = async () => {
      try {
        const res = await fetchMovieReviews(movieId);
        setReviews(res.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(review => (
            <li className={s.item} key={review.id}>
              <h4 className={s.author}>{review.author}</h4>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
