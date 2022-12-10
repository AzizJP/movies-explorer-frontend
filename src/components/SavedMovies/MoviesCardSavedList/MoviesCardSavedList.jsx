import { memo } from 'react';
import MoviesCardSaved from '../MoviesCardSaved/MoviesCardSaved';

/*styles in Movies/MoviesCardList*/
const MoviesCardSavedList = memo(
  ({ savedMoviesState, handleDeleteMovie, isRequestingServer }) => {
    return (
      <section className="movies-list">
        {savedMoviesState.map(film => (
          <MoviesCardSaved
            key={film._id}
            film={film}
            handleDeleteMovie={handleDeleteMovie}
            isRequestingServer={isRequestingServer}
          />
        ))}
      </section>
    );
  }
);

export default MoviesCardSavedList;
