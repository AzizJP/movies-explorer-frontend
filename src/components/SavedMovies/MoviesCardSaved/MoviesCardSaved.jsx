import { memo } from 'react';

import { ReactComponent as DeleteIcon } from '../../../images/delete.svg';

/*styles in Movies/MoviesCard*/
const MoviesCardSaved = memo(
  ({ image, title, duration, amISaved }) => {
    return (
      <article className="movies-card">
        <img
          src={image}
          alt="Превью фильма"
          className="movies-card__image"
        />
        <div className="movies-card__about-wrapper">
          <div className="movies-card__about">
            <h2 className="movies-card__title">{title}</h2>
            <p className="movies-card__duration">{duration}</p>
          </div>
          {amISaved ? (
            <div className="movies-card__icon-wrapper">
              <button type="button" className="movies-card__icon">
                <DeleteIcon />
              </button>
            </div>
          ) : null}
        </div>
      </article>
    );
  }
);

export default MoviesCardSaved;
