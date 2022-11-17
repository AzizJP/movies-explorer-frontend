import { memo } from 'react';

import './SearchForm.css';

const SearchForm = memo(() => {
  return (
    <div className="search__input-wrapper">
      <input type="text" className="search__input" placeholder="Фильм" />
      <button className="search__button button-hover">Найти</button>
    </div>
  );
});

export default SearchForm;
