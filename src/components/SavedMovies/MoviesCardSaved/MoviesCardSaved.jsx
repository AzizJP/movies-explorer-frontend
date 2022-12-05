import { useCallback } from 'react';
import { memo } from 'react';

import { ReactComponent as DeleteIcon } from '../../../images/delete.svg';

/*styles in Movies/MoviesCard*/
const MoviesCardSaved = memo(({ film, handleDeleteMovie }) => {
  const { image, nameRU, duration, _id, trailerLink } = film;

  const onDeleteMovie = useCallback(() => {
    handleDeleteMovie(_id);
  }, [_id, handleDeleteMovie]);

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
          <p className="movies-card__duration">{duration}</p>
        </div>
        <div className="movies-card__icon-wrapper">
          <button
            type="button"
            className="movies-card__icon"
            onClick={onDeleteMovie}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </article>
  );
});

export default MoviesCardSaved;
