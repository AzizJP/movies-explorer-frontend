import { memo, useCallback, useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreButton from './MoreButton/MoreButton';
import Preloader from './Preloader/Preloader';

import './Movies.css';

const Movies = memo(
  ({
    savedMoviesState,
    handleDeleteMovie,
    handleAddSavedMovie,
    handleInfoTooltip,
    handleErrorMessageChange,
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [foundMovies, setFoundMovies] = useState(
      JSON.parse(localStorage.getItem('movies')) || []
    );
    const [notFoundMovies, setNotFoundMovies] = useState(false);
    const [maxAmount, setMaxAmount] = useState(0);
    const showMovies = foundMovies.slice(0, maxAmount);
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
    }, [foundMovies, isDesktop, isLaptop, isPhone]);

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
        if (!savedMoviesState.find(i => i.movieId === movie.id)) {
          handleAddSavedMovie(movie);
        }
        if (!!savedMoviesState.find(i => i.movieId === movie.id)) {
          const savedMovie = savedMoviesState.find(
            i => i.movieId === movie.id
          );
          handleDeleteMovie(savedMovie._id);
        }
      },
      [handleAddSavedMovie, handleDeleteMovie, savedMoviesState]
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
        />
        {isLoading ? <Preloader /> : null}
        <MoviesCardList
          showMovies={showMovies}
          notFoundMovies={notFoundMovies}
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
