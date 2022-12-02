import { memo, useCallback, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoreButton from './MoreButton/MoreButton';

const Movies = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const showMoreCards = useCallback(() => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <MoreButton
        isLoading={isLoading}
        showMoreCards={showMoreCards}
      />
    </section>
  );
});

export default Movies;
