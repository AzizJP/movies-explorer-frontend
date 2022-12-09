import {
  memo,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreButton from './MoreButton/MoreButton';
import Preloader from './Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import {
  CARDS_INCREMENT_AT_DESKTOP,
  CARDS_INCREMENT_AT_PHONE,
  DESKTOP_BREAKPOINT,
  LAPTOP_BREAKPOINT,
  PHONE_BREAKPOINT,
  VISIBLE_CARDS_AT_DESKTOP,
  VISIBLE_CARDS_AT_LAPTOP,
  VISIBLE_CARDS_AT_PHONE,
} from '../../utils/constants';

import './Movies.css';

const Movies = memo(
  ({
    savedMoviesState,
    handleDeleteMovie,
    handleAddSavedMovie,
    handleInfoTooltip,
    handleErrorMessageChange,
    isRequestingServer,
    handleRequestingServerChange,
  }) => {
    const currentUser = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [foundMovies, setFoundMovies] = useState(
      JSON.parse(localStorage.getItem('found-movies')) || []
    );
    const [displayedMovies, setDisplayedMovies] = useState(
      JSON.parse(localStorage.getItem('movies')) || []
    );
    const [notFoundMovies, setNotFoundMovies] = useState(
      JSON.parse(localStorage.getItem('is-not-found')) || false
    );
    const [maxAmount, setMaxAmount] = useState(0);
    const showMovies = displayedMovies.slice(0, maxAmount);
    const windowInnerWidth = window.innerWidth;

    const searchOptions = JSON.parse(
      localStorage.getItem('search-options')
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
          'search': getInitialSearchText(),
        },
        {
          'search': 'Нужно ввести ключевое слово',
        },
        {
          'search': getInitialSearchText(),
        }
      );

    useEffect(() => {
      if (isRequestingServer) {
        handleRequestingServerChange(false);
      }
    }, []);

    useEffect(() => {
      if (windowInnerWidth >= PHONE_BREAKPOINT) {
        setMaxAmount(VISIBLE_CARDS_AT_PHONE);
      }
      if (windowInnerWidth >= LAPTOP_BREAKPOINT) {
        setMaxAmount(VISIBLE_CARDS_AT_LAPTOP);
      }
      if (windowInnerWidth >= DESKTOP_BREAKPOINT) {
        setMaxAmount(VISIBLE_CARDS_AT_DESKTOP);
      }
      localStorage.setItem('movies', JSON.stringify(displayedMovies));
      localStorage.setItem(
        'found-movies',
        JSON.stringify(foundMovies)
      );
      localStorage.setItem(
        'is-not-found',
        JSON.stringify(notFoundMovies)
      );
    }, [
      displayedMovies,
      foundMovies,
      notFoundMovies,
      windowInnerWidth,
    ]);

    const handleLoadingChange = useCallback(loading => {
      setIsLoading(loading);
    }, []);
    const handleNotFoundMoviesChange = useCallback(isNotFound => {
      setNotFoundMovies(isNotFound);
    }, []);
    const handleFoundMoviesChange = useCallback(movies => {
      setFoundMovies(movies);
    }, []);
    const handleDisplayedMoviesChange = useCallback(movies => {
      setDisplayedMovies(movies);
    }, []);

    const showMoreCards = useCallback(() => {
      if (windowInnerWidth >= PHONE_BREAKPOINT)
        setMaxAmount(prev => prev + CARDS_INCREMENT_AT_PHONE);
      if (windowInnerWidth >= DESKTOP_BREAKPOINT)
        setMaxAmount(prev => prev + CARDS_INCREMENT_AT_DESKTOP);
    }, [windowInnerWidth]);

    const toggleMovieLike = useCallback(
      movie => {
        const savedMovie = savedMoviesState.find(
          i => i.movieId === movie.id
        );
        const Liked = !!savedMoviesState.find(
          i => i.movieId === movie.id && i.owner === currentUser._id
        );
        if (!savedMovie || !Liked) {
          return handleAddSavedMovie(movie);
        }
        if (Liked) {
          return handleDeleteMovie(savedMovie._id);
        }
      },
      [
        currentUser._id,
        handleAddSavedMovie,
        handleDeleteMovie,
        savedMoviesState,
      ]
    );

    return (
      <section className="movies">
        <SearchForm
          handleLoadingChange={handleLoadingChange}
          notFoundMovies={notFoundMovies}
          handleNotFoundMoviesChange={handleNotFoundMoviesChange}
          foundMovies={foundMovies}
          displayedMovies={displayedMovies}
          handleFoundMoviesChange={handleFoundMoviesChange}
          handleDisplayedMoviesChange={handleDisplayedMoviesChange}
          handleInfoTooltip={handleInfoTooltip}
          handleErrorMessageChange={handleErrorMessageChange}
          searchOptions={searchOptions}
          isLoading={isLoading}
          value={values['search']}
          isValid={isValid['search']}
          error={errors['search']}
          handleChange={handleChange}
          inputName="search"
        />
        {isLoading ? <Preloader /> : null}
        {notFoundMovies ? (
          <h3 className="movies__not-found">Ничего не найдено</h3>
        ) : null}
        <MoviesCardList
          showMovies={showMovies}
          toggleMovieLike={toggleMovieLike}
          savedMoviesState={savedMoviesState}
          isRequestingServer={isRequestingServer}
        />
        {displayedMovies.length === 0 ||
        maxAmount >= displayedMovies.length ? null : (
          <MoreButton
            isLoading={isLoading}
            showMoreCards={showMoreCards}
          />
        )}
      </section>
    );
  }
);

export default Movies;
