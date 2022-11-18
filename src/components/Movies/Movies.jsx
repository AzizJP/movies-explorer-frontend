import { memo } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';

import './Movies.css';

const Movies = memo(() => {
  return (
    <section className="movies">
      Movies
      <SearchForm />
      <Preloader />
    </section>
  );
});

export default Movies;
