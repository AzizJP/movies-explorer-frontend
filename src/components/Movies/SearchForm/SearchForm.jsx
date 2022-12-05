import { memo, useCallback, useState } from 'react';
import * as MoviesApi from '../../../utils/MoviesApi';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';
import SearchFormInput from '../../Shared/SearchFormInput/SearchFormInput';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';

import './SearchForm.css';
import { useLocation } from 'react-router-dom';

const SearchForm = memo(
  ({
    handleLoadingChange,
    handleNotFoundMoviesChange,
    foundMovies,
    handleFoundMoviesChange,
    handleInfoTooltip,
    handleErrorMessageChange,
  }) => {
    const path = useLocation();
    const [isToggled, setIsToggled] = useState(false);
    const { values, handleChange, errors, isValid } =
      useFormWithValidation(
        {
          'search': '',
        },
        {
          'search': 'Нужно ввести ключевое слово',
        },
        {
          'search': false,
        }
      );

    const filterMovies = useCallback(
      movies => {
        const newMovies = movies.reduce((acc, item) => {
          const sameSearchName = item.nameRU
            .toLowerCase()
            .includes(values['search'].toLowerCase());
          const sameId = foundMovies.some(
            movie => movie.id === item.id
          );
          if (sameSearchName && !sameId) {
            return [...acc, item];
          }
          return acc;
        }, []);
        if (newMovies.length === 0) {
          return handleNotFoundMoviesChange(true);
        }
        handleNotFoundMoviesChange(false);
        handleFoundMoviesChange([...newMovies, ...foundMovies]);
      },
      [
        handleNotFoundMoviesChange,
        handleFoundMoviesChange,
        foundMovies,
        values,
      ]
    );

    const filterSavedMovies = useCallback(
      savedMovies => {
        const newSavedMovies = savedMovies.reduce((acc, item) => {
          const sameSearchName = item.nameRU
            .toLowerCase()
            .includes(values['search'].toLowerCase());
          if (sameSearchName) {
            return [...acc, item];
          }
          return acc;
        }, []);

        if (newSavedMovies.length === 0) {
          return handleNotFoundMoviesChange(true);
        }
        handleNotFoundMoviesChange(false);
        handleFoundMoviesChange(newSavedMovies);
      },
      [handleFoundMoviesChange, handleNotFoundMoviesChange, values]
    );

    const handleToggleButtonClick = useCallback(() => {
      setIsToggled(!isToggled);
    }, [isToggled]);

    const handleSubmit = useCallback(
      evt => {
        evt.preventDefault();
        if (!isValid['search']) {
          handleErrorMessageChange(errors['search']);
          return handleInfoTooltip();
        }
        if (path.pathname === '/movies') {
          MoviesApi.getContent()
            .then(res => {
              if (!res) {
                throw new Error(
                  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                );
              }
              if (res) {
                handleLoadingChange(true);
                filterMovies(res);
              }
            })
            .catch(err => {
              handleErrorMessageChange('Что-то пошло не так!');
              handleInfoTooltip();
            })
            .finally(() => {
              handleLoadingChange(false);
            });
        }
        if (path.pathname === '/saved-movies') {
          filterSavedMovies(foundMovies.reverse());
        }
      },
      [
        isValid,
        path.pathname,
        handleErrorMessageChange,
        errors,
        handleInfoTooltip,
        handleLoadingChange,
        filterMovies,
        filterSavedMovies,
        foundMovies,
      ]
    );

    return (
      <section className="search">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="search__form"
        >
          <SearchFormInput
            value={values['search']}
            onChange={handleChange}
          />
          <div className="search__toggler-wrapper">
            <h4 className="search__toggler-title">Короткометражки</h4>
            <ToggleCheckbox
              toggleCheckboxClick={handleToggleButtonClick}
              isToggled={isToggled}
            />
          </div>
        </form>
      </section>
    );
  }
);

export default SearchForm;
