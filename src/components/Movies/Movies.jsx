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

import './Movies.css';

const Movies = memo(
  ({
    savedMoviesState,
    handleDeleteMovie,
    handleAddSavedMovie,
    handleInfoTooltip,
    handleErrorMessageChange,
  }) => {
    const currentUser = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [foundMovies, setFoundMovies] = useState(
      JSON.parse(localStorage.getItem('movies')) || []
    );
    const [notFoundMovies, setNotFoundMovies] = useState(
      JSON.parse(localStorage.getItem('is-not-found')) || false
    );
    const [maxAmount, setMaxAmount] = useState(0);
    const showMovies = foundMovies.slice(0, maxAmount);
    const windowInnerWidth = window.innerWidth;
    const isPhone = windowInnerWidth >= 320;
    const isLaptop = windowInnerWidth >= 634;
    const isDesktop = windowInnerWidth >= 1137;

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
      if (isPhone) {
        setMaxAmount(5);
      }
      if (isLaptop) {
        setMaxAmount(8);
      }
      if (isDesktop) {
        setMaxAmount(12);
      }
      localStorage.setItem('movies', JSON.stringify(foundMovies));
      localStorage.setItem(
        'is-not-found',
        JSON.stringify(notFoundMovies)
      );
    }, [foundMovies, isDesktop, isLaptop, isPhone, notFoundMovies]);

    const handleLoadingChange = useCallback(loading => {
      setIsLoading(loading);
    }, []);
    const handleNotFoundMoviesChange = useCallback(isNotFound => {
      setNotFoundMovies(isNotFound);
    }, []);
    const handleFoundMoviesChange = useCallback(movies => {
      setFoundMovies(movies);
    }, []);

    const showMoreCards = useCallback(() => {
      if (isPhone) setMaxAmount(prev => prev + 2);
      if (isDesktop) setMaxAmount(prev => prev + 1);
    }, [isDesktop, isPhone]);

    const toggleMovieLike = useCallback(
      movie => {
        const savedMovie = savedMoviesState.find(
          i => i.movieId === movie.id
        );
        if (
          !savedMovie ||
          !!savedMoviesState.find(
            i => i.movieId === movie.id && i.owner !== currentUser._id
          )
        ) {
          return handleAddSavedMovie(movie);
        }
        if (
          !!savedMoviesState.find(
            i => i.movieId === movie.id && i.owner === currentUser._id
          )
        ) {
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
          handleNotFoundMoviesChange={handleNotFoundMoviesChange}
          foundMovies={foundMovies}
          handleFoundMoviesChange={handleFoundMoviesChange}
          handleInfoTooltip={handleInfoTooltip}
          handleErrorMessageChange={handleErrorMessageChange}
          searchOptions={searchOptions}
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
        />
        {foundMovies.length === 0 ||
        maxAmount >= foundMovies.length ? null : (
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
