import { memo } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';

import './SavedMovies.css';

const SavedMovies = memo(() => {
  return (
    <section className="saved-movies">
      SavedMovies
      <SearchForm />
    </section>
  );
});

export default SavedMovies;
