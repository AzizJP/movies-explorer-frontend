import { useEffect } from 'react';
import { memo, useCallback, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardSavedList from './MoviesCardSavedList/MoviesCardSavedList';

import './SavedMovies.css';

const SavedMovies = memo(
  ({
    initialMoviesState,
    handleDeleteMovie,
    handleInfoTooltip,
    handleErrorMessageChange,
  }) => {
    const [notFoundSavedMovies, setNotFoundSavedMovies] =
      useState(false);
    const [savedMovies, setIsSavedMovies] = useState(
      initialMoviesState
    );

    useEffect(() => {
      setIsSavedMovies(initialMoviesState);
    }, [initialMoviesState]);

    const searchOptions = JSON.parse(
      localStorage.getItem('saved-movies-search-options')
    );

    const getInitialSearchText = useCallback(() => {
      if (searchOptions) {
        return searchOptions.text;
      }
      return '';
    }, [searchOptions]);

    const { values, handleChange, errors, isValid } =
      useFormWithValidation(
        {
          'saved-movies-search': getInitialSearchText(),
        },
        {
          'saved-movies-search': 'Нужно ввести ключевое слово',
        },
        {
          'saved-movies-search': getInitialSearchText(),
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
          foundMovies={savedMovies}
          handleFoundMoviesChange={handleSavedMoviesChange}
          handleInfoTooltip={handleInfoTooltip}
          handleErrorMessageChange={handleErrorMessageChange}
          searchOptions={searchOptions}
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
        />
      </section>
    );
  }
);

export default SavedMovies;
