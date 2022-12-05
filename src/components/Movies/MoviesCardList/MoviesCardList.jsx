import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = memo(
  ({
    showMovies,
    notFoundMovies,
    toggleMovieLike,
    savedMoviesState,
  }) => {
    return (
      <section className="movies-list">
        {notFoundMovies ? <span>Ничего не найдено</span> : null}
        {showMovies.map(film => (
          <MoviesCard
            key={film.id}
            toggleMovieLike={toggleMovieLike}
            film={film}
            savedMoviesState={savedMoviesState}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardList;
