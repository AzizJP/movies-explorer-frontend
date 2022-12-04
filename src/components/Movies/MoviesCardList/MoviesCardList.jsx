import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const baseUrlForImage = 'https://api.nomoreparties.co';

const MoviesCardList = memo(
  ({ showMovies, notFoundMovies, toggleMovieLike }) => {
    return (
      <section className="movies-list">
        {notFoundMovies ? <span>Ничего не найдено</span> : null}
        {showMovies.map(film => (
          <MoviesCard
            key={film.id}
            id={film.id}
            image={baseUrlForImage + film.image.url}
            title={film.nameRU}
            duration={film.duration}
            toggleMovieLike={toggleMovieLike}
            isLiked={film.isLiked}
            film={film}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardList;
