import { memo } from 'react';
import MoviesCardSaved from '../MoviesCardSaved/MoviesCardSaved';

/*styles in Movies/MoviesCardList*/
const MoviesCardSavedList = memo(
  ({ notFoundSavedMovies, savedMoviesState, handleDeleteMovie }) => {
    return (
      <section className="movies-list">
        {notFoundSavedMovies ? <span>Ничего не найдено</span> : null}
        {savedMoviesState.reverse().map(film => (
          <MoviesCardSaved
            key={film.movieId}
            film={film}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardSavedList;
