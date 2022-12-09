import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = memo(
  ({
    showMovies,
    toggleMovieLike,
    savedMoviesState,
    isRequestingServer,
  }) => {
    return (
      <section className="movies-list">
        {showMovies.map(film => (
          <MoviesCard
            key={film.id}
            toggleMovieLike={toggleMovieLike}
            film={film}
            savedMoviesState={savedMoviesState}
            isRequestingServer={isRequestingServer}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardList;
