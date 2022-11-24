import { memo } from 'react';

import { ReactComponent as SaveIcon } from '../../../images/save.svg';
import { ReactComponent as SavedIcon } from '../../../images/saved.svg';

import './MoviesCard.css';

const MoviesCard = memo(({ image, title, duration, inSaved }) => {
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
        <div className="movies-card__icon-wrapper">
          <button type="button" className="movies-card__icon">
            {inSaved ? <SavedIcon /> : <SaveIcon />}
          </button>
        </div>
      </div>
    </article>
  );
});

export default MoviesCard;
