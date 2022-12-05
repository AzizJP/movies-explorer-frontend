import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = memo(
  ({ showMovies, toggleMovieLike, savedMoviesState }) => {
    return (
      <section className="movies-list">
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
