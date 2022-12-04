import { memo, useCallback, useState, useEffect } from 'react';
import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreButton from './MoreButton/MoreButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import InfoTooltip from '../Shared/InfoTooltip/InfoTooltip';
import Preloader from './Preloader/Preloader';

import './Movies.css';

const Movies = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchInfoTooltipOpen, setIsSearchInfoTooltipOpen] =
    useState(false);
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('saved-movies')) || []
  );
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
  const windowInnerWidth = window.innerWidth;
  const isPhone = windowInnerWidth >= 320;
  const isLaptop = windowInnerWidth >= 634;
  const isDesktop = windowInnerWidth >= 1137;

  useEffect(() => {
    if (isPhone) {
      setMaxAmount(5);
    }
    if (isLaptop) {
      setMaxAmount(8);
    }
    if (isDesktop) {
      setMaxAmount(12);
    }
    if (foundMovies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(foundMovies));
    }
    if (savedMovies.length > 0) {
      localStorage.setItem(
        'saved-movies',
        JSON.stringify(savedMovies)
      );
    }
    if (savedMovies.length === 0) {
      localStorage.removeItem('saved-movies');
    }
  }, [foundMovies, isDesktop, isLaptop, isPhone, savedMovies]);

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
    if (isPhone) setMaxAmount(prev => prev + 2);
    if (isDesktop) setMaxAmount(prev => prev + 1);
  }, [isDesktop, isPhone]);

  const toggleMovieLike = useCallback(
    movie => {
      const copyMovies = [...foundMovies];
      const idx = copyMovies.findIndex(i => i.id === movie.id);
      if (!movie.isLiked) {
        const newMovie = { ...movie, isLiked: true };
        copyMovies.splice(idx, 1, newMovie);
        setFoundMovies(copyMovies);
        MainApi.addToFavorite(movie)
          .then(newMovie => {
            setSavedMovies([newMovie, ...savedMovies]);
            console.log(newMovie);
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      if (movie.isLiked) {
        const likedMovie = { ...movie, isLiked: false };
        copyMovies.splice(idx, 1, likedMovie);
        setFoundMovies(copyMovies);
        const copySavedMovies = [...savedMovies];
        const savedMovieIdx = copySavedMovies.findIndex(
          i => i.movieId === movie.id
        );
        const savedMovie = copySavedMovies[savedMovieIdx];
        copySavedMovies.splice(savedMovieIdx, 1);
        setSavedMovies(copySavedMovies);
        MainApi.deleteFromFavorite(savedMovie._id)
          .then(newMovie => {
            console.log(newMovie);
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
    },
    [foundMovies, savedMovies]
  );

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
        toggleMovieLike={toggleMovieLike}
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
