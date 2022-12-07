import {
  useContext,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

import { ReactComponent as SaveIcon } from '../../../images/save.svg';
import { ReactComponent as SavedIcon } from '../../../images/saved.svg';

import './MoviesCard.css';

const baseUrlForImage = 'https://api.nomoreparties.co';

const MoviesCard = memo(
  ({ toggleMovieLike, film, savedMoviesState }) => {
    const [isSaved, setIsSaved] = useState(false);
    const { image, trailerLink, nameRU, duration, id } = film;
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
      if (savedMoviesState.length === 0) setIsSaved(false);
      if (savedMoviesState.length > 0) {
        setIsSaved(
          !!savedMoviesState.find(
            i => i.movieId === id && i.owner === currentUser._id
          )
        );
      }
    }, [currentUser._id, id, savedMoviesState]);

    const onCardLike = useCallback(() => {
      toggleMovieLike(film);
    }, [film, toggleMovieLike]);
    return (
      <article className="movies-card">
        <a
          href={trailerLink}
          target="_blank"
          className="movies-card__image-wrapper"
          rel="noreferrer"
        >
          <img
            src={baseUrlForImage + image.url}
            alt="Превью фильма"
            className="movies-card__image"
          />
        </a>
        <div className="movies-card__about-wrapper">
          <div className="movies-card__about">
            <h2 className="movies-card__title">{nameRU}</h2>
            <p className="movies-card__duration">{duration}</p>
          </div>
          <div className="movies-card__icon-wrapper">
            <button
              type="button"
              className="movies-card__icon"
              onClick={onCardLike}
            >
              {isSaved ? <SavedIcon /> : <SaveIcon />}
            </button>
          </div>
        </div>
      </article>
    );
  }
);

export default MoviesCard;
