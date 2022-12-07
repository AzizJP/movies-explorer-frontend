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
    const searchOptions = JSON.parse(
      localStorage.getItem('search-options')
    );
    const [isToggled, setIsToggled] = useState(
      searchOptions.isShortFilm || false
    );
    const { values, handleChange, errors, isValid } =
      useFormWithValidation(
        {
          'search': searchOptions.text,
        },
        {
          'search': 'Нужно ввести ключевое слово',
        },
        {
          'search': searchOptions.text,
        }
      );

    const filterMovies = useCallback(
      movies => {
        const newMovies = movies.reduce((acc, item) => {
          const sameSearchName = item.nameRU
            .toLowerCase()
            .includes(values['search'].toLowerCase());
          if (!sameSearchName) {
            return acc;
          }
          if (isToggled) {
            const shortMovie = item.duration < 40;
            if (sameSearchName && shortMovie) {
              return [...acc, item];
            }
            return acc;
          }
          if (sameSearchName) {
            return [...acc, item];
          }
          return acc;
        }, []);
        if (newMovies.length === 0) {
          handleFoundMoviesChange(newMovies);
          return handleNotFoundMoviesChange(true);
        }
        handleNotFoundMoviesChange(false);
        handleFoundMoviesChange(newMovies);
      },
      [
        handleNotFoundMoviesChange,
        handleFoundMoviesChange,
        values,
        isToggled,
      ]
    );

    const handleToggleButtonClick = useCallback(() => {
      setIsToggled(!isToggled);
    }, [isToggled]);

    const handleSubmit = useCallback(
      evt => {
        evt.preventDefault();
        if (!isValid['search']) {
          if (path.pathname === '/movies') {
            handleLoadingChange(false);
          }
          handleErrorMessageChange(errors['search']);
          return handleInfoTooltip();
        }
        if (path.pathname === '/movies') {
          localStorage.setItem(
            'search-options',
            JSON.stringify({
              text: values['search'],
              isShortFilm: isToggled,
            })
          );
          handleLoadingChange(true);
          MoviesApi.getContent()
            .then(res => {
              if (!res) {
                throw new Error(
                  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                );
              }
              if (res) {
                handleLoadingChange(false);
                filterMovies(res);
              }
            })
            .catch(err => {
              handleLoadingChange(false);
              handleErrorMessageChange('Что-то пошло не так!');
              handleInfoTooltip();
            })
            .finally(() => {
              handleLoadingChange(false);
            });
        }
        if (path.pathname === '/saved-movies') {
          filterMovies(foundMovies.reverse());
        }
      },
      [
        isValid,
        path.pathname,
        handleErrorMessageChange,
        errors,
        handleInfoTooltip,
        handleLoadingChange,
        values,
        isToggled,
        filterMovies,
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
