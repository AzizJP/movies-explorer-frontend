import { memo, useCallback, useState, useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardSavedList from './MoviesCardSavedList/MoviesCardSavedList';

import './SavedMovies.css';

const SavedMovies = memo(
  ({
    initialMoviesState,
    handleInitialMoviesChange,
    handleDeleteMovie,
    handleInfoTooltip,
    handleErrorMessageChange,
    isRequestingServer,
  }) => {
    const [notFoundSavedMovies, setNotFoundSavedMovies] =
      useState(false);
    const [savedMovies, setIsSavedMovies] = useState([
      ...initialMoviesState,
    ]);

    useEffect(() => {
      setIsSavedMovies(initialMoviesState);
    }, [initialMoviesState]);

    const { values, handleChange, errors, isValid } =
      useFormWithValidation(
        {
          'saved-movies-search': '',
        },
        {
          'saved-movies-search': 'Нужно ввести ключевое слово',
        },
        {
          'saved-movies-search': false,
        }
      );

    const handleNotFoundSavedMoviesChange = useCallback(
      isNotFound => {
        setNotFoundSavedMovies(isNotFound);
      },
      []
    );

    const handleSavedMoviesChange = useCallback(newState => {
      setIsSavedMovies(newState);
    }, []);

    return (
      <section className="saved-movies">
        <SearchForm
          handleNotFoundMoviesChange={handleNotFoundSavedMoviesChange}
          foundMovies={initialMoviesState}
          displayedMovies={savedMovies}
          handleDisplayedMoviesChange={handleSavedMoviesChange}
          handleFoundMoviesChange={handleInitialMoviesChange}
          handleInfoTooltip={handleInfoTooltip}
          handleErrorMessageChange={handleErrorMessageChange}
          value={values['saved-movies-search']}
          isValid={isValid['saved-movies-search']}
          error={errors['saved-movies-search']}
          handleChange={handleChange}
          inputName="saved-movies-search"
        />
        {notFoundSavedMovies ? (
          <h3 className="movies__not-found">Ничего не найдено</h3>
        ) : null}
        <MoviesCardSavedList
          savedMoviesState={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          isRequestingServer={isRequestingServer}
        />
      </section>
    );
  }
);

export default SavedMovies;
