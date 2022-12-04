import { memo, useCallback, useState } from 'react';
import * as MoviesApi from '../../utils/MoviesApi';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreButton from './MoreButton/MoreButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import InfoTooltip from '../Shared/InfoTooltip/InfoTooltip';

import './Movies.css';
import Preloader from './Preloader/Preloader';
import { useEffect } from 'react';

const Movies = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchInfoTooltipOpen, setIsSearchInfoTooltipOpen] =
    useState(false);
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const windowInnerWidth = window.innerWidth;
  const [maxAmount, setMaxAmount] = useState(0);
  const showMovies = foundMovies.slice(0, maxAmount);
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

  useEffect(() => {
    if (windowInnerWidth >= 320) {
      setMaxAmount(5);
    }
    if (windowInnerWidth >= 634) {
      setMaxAmount(8);
    }
    if (windowInnerWidth >= 1137) {
      setMaxAmount(12);
    }
    if (foundMovies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(foundMovies));
    }
  }, [foundMovies, windowInnerWidth]);

  const handleSearchClick = useCallback(() => {
    setIsSearchInfoTooltipOpen(true);
  }, []);
  const closeInfoTooltip = useCallback(() => {
    setIsSearchInfoTooltipOpen(false);
  }, []);

  const filterData = useCallback(
    res => {
      const data = res.reduce((acc, item) => {
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
      console.log(data);
      if (data.length === 0) return setNotFoundMovies(true);
      setNotFoundMovies(false);
      setFoundMovies([...data, ...foundMovies]);
    },
    [values, foundMovies]
  );

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      setIsLoading(true);
      if (!isValid['search']) {
        return handleSearchClick();
      }
      MoviesApi.getContent()
        .then(res => {
          if (!res) {
            throw new Error(
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            );
          }
          if (res) {
            filterData(res);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
          handleSearchClick();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isValid, handleSearchClick, filterData]
  );

  const showMoreCards = useCallback(() => {
    if (windowInnerWidth >= 320) setMaxAmount(prev => prev + 2);
    if (windowInnerWidth >= 1137) setMaxAmount(prev => prev + 1);
  }, [windowInnerWidth]);

  return (
    <section className="movies">
      <SearchForm
        value={values['search']}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {isLoading ? <Preloader /> : null}
      <MoviesCardList
        showMovies={showMovies}
        notFoundMovies={notFoundMovies}
      />
      {foundMovies.length === 0 ||
      maxAmount >= foundMovies.length ? null : (
        <MoreButton
          isLoading={isLoading}
          showMoreCards={showMoreCards}
        />
      )}
      <InfoTooltip
        isOpen={isSearchInfoTooltipOpen}
        onClose={closeInfoTooltip}
        errorText={errorMessage || errors['search']}
      />
    </section>
  );
});

export default Movies;
