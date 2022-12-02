import { memo } from 'react';

import './SearchFormInput.css';

const SearchFormInput = memo(() => {
  return (
    <div className="search__input-wrapper">
      <input
        type="text"
        required
        className="search__input"
        placeholder="Фильм"
      />
      <button className="search__button button-hover">Найти</button>
    </div>
  );
});

export default SearchFormInput;
