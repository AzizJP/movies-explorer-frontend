import { memo } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardSavedList from './MoviesCardSavedList/MoviesCardSavedList';

import './SavedMovies.css';

const SavedMovies = memo(() => {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardSavedList />
    </section>
  );
});

export default SavedMovies;
