import { memo, useCallback, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { getTimeFromMinutes } from '../../../utils/helpers';

import { ReactComponent as DeleteIcon } from '../../../images/delete.svg';

/*styles in Movies/MoviesCard*/
const MoviesCardSaved = memo(
  ({ film, handleDeleteMovie, isRequestingServer }) => {
    const currentUser = useContext(CurrentUserContext);
    const { image, nameRU, duration, _id, trailerLink, owner } = film;
    const isItMyFilm = owner === currentUser._id;

    const onDeleteMovie = useCallback(() => {
      handleDeleteMovie(_id);
    }, [_id, handleDeleteMovie]);
    if (isItMyFilm)
      return (
        <article className="movies-card">
          <a
            href={trailerLink}
            target="_blank"
            className="movies-card__image-wrapper"
            rel="noreferrer"
          >
            <img
              src={image}
              alt="Превью фильма"
              className="movies-card__image"
            />
          </a>
          <div className="movies-card__about-wrapper">
            <div className="movies-card__about">
              <h2 className="movies-card__title">{nameRU}</h2>
              <p className="movies-card__duration">
                {getTimeFromMinutes(duration)}
              </p>
            </div>
            <div className="movies-card__icon-wrapper">
              <button
                type="button"
                className="movies-card__icon"
                onClick={onDeleteMovie}
                disabled={isRequestingServer}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </article>
      );
  }
);

export default MoviesCardSaved;
