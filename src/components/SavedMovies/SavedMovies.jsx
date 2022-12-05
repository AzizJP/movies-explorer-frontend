import { memo, useCallback, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardSavedList from './MoviesCardSavedList/MoviesCardSavedList';

import './SavedMovies.css';

const SavedMovies = memo(
  ({
    savedMoviesState,
    handleDeleteMovie,
    handleSavedMoviesChange,
    handleInfoTooltip,
    handleErrorMessageChange,
  }) => {
    const [notFoundSavedMovies, setNotFoundSavedMovies] =
      useState(false);

    const handleNotFoundSavedMoviesChange = useCallback(
      isNotFound => {
        setNotFoundSavedMovies(isNotFound);
      },
      []
    );

    return (
      <section className="saved-movies">
        <SearchForm
          handleNotFoundMoviesChange={handleNotFoundSavedMoviesChange}
          foundMovies={savedMoviesState}
          handleFoundMoviesChange={handleSavedMoviesChange}
          handleInfoTooltip={handleInfoTooltip}
          handleErrorMessageChange={handleErrorMessageChange}
        />
        <MoviesCardSavedList
          notFoundSavedMovies={notFoundSavedMovies}
          savedMoviesState={savedMoviesState}
          handleDeleteMovie={handleDeleteMovie}
        />
      </section>
    );
  }
);

export default SavedMovies;
