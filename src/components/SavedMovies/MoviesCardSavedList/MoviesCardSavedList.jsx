import { memo } from 'react';
import MoviesCardSaved from '../MoviesCardSaved/MoviesCardSaved';

/*styles in Movies/MoviesCardList*/
const MoviesCardSavedList = memo(
  ({ savedMoviesState, handleDeleteMovie }) => {
    return (
      <section className="movies-list">
        {savedMoviesState.map(film => (
          <MoviesCardSaved
            key={film._id}
            film={film}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardSavedList;
