import { memo, useCallback, useState } from 'react';
import * as MoviesApi from '../../../utils/MoviesApi';
import SearchFormInput from '../../Shared/SearchFormInput/SearchFormInput';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SHORT_FILM_DURATION } from '../../../utils/constants';

import './SearchForm.css';

const SearchForm = memo(
  ({
    handleLoadingChange,
    handleNotFoundMoviesChange,
    foundMovies,
    displayedMovies,
    handleFoundMoviesChange,
    handleDisplayedMoviesChange,
    handleInfoTooltip,
    handleErrorMessageChange,
    value,
    isValid,
    error,
    handleChange,
    searchOptions,
    inputName,
    isLoading,
  }) => {
    const path = useLocation();

    const getInitialToggleState = useCallback(() => {
      if (searchOptions) {
        return searchOptions.isShortFilm;
      }
      return false;
    }, [searchOptions]);

    const [isToggled, setIsToggled] = useState(
      getInitialToggleState()
    );

    const displayShortMovies = useCallback(
      movies => {
        const newMovies = movies.reduce((acc, item) => {
          const shortMovie = item.duration < SHORT_FILM_DURATION;
          if (shortMovie) {
            return [...acc, item];
          }
          return acc;
        }, []);
        handleDisplayedMoviesChange(newMovies);
      },
      [handleDisplayedMoviesChange]
    );

    const filterMovies = useCallback(
      movies => {
        const newMovies = movies.reduce((acc, item) => {
          const sameSearchName = item.nameRU
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim());
          if (!sameSearchName) {
            return acc;
          }
          if (isToggled) {
            const shortMovie = item.duration < SHORT_FILM_DURATION;
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
          handleDisplayedMoviesChange(newMovies);
          return handleNotFoundMoviesChange(true);
        }
        if (path.pathname === '/movies') {
          handleFoundMoviesChange(newMovies);
        }
        handleNotFoundMoviesChange(false);
        handleDisplayedMoviesChange(newMovies);
      },
      [
        handleDisplayedMoviesChange,
        handleFoundMoviesChange,
        handleNotFoundMoviesChange,
        isToggled,
        path.pathname,
        value,
      ]
    );

    const handleToggleButtonClick = useCallback(() => {
      setIsToggled(!isToggled);
      if (displayedMovies.length === 0) return;
      if (!isToggled) return displayShortMovies(foundMovies);
      if (isToggled) return handleDisplayedMoviesChange(foundMovies);
    }, [
      displayShortMovies,
      displayedMovies,
      foundMovies,
      handleDisplayedMoviesChange,
      isToggled,
    ]);

    useEffect(() => {
      if (path.pathname === '/movies') {
        localStorage.setItem(
          'search-options',
          JSON.stringify({
            text: value,
            isShortFilm: isToggled,
          })
        );
      }
    }, [isToggled, path.pathname, value]);

    const handleSubmit = useCallback(
      evt => {
        evt.preventDefault();
        if (!isValid) {
          if (path.pathname === '/movies') {
            handleLoadingChange(false);
          }
          handleErrorMessageChange(error);
          return handleInfoTooltip();
        }
        if (path.pathname === '/movies') {
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
          filterMovies(foundMovies);
        }
      },
      [
        error,
        filterMovies,
        foundMovies,
        handleErrorMessageChange,
        handleInfoTooltip,
        handleLoadingChange,
        isValid,
        path.pathname,
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
            value={value}
            onChange={handleChange}
            name={inputName}
            isLoading={isLoading}
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
