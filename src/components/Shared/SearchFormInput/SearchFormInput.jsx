import { memo } from 'react';

import './SearchFormInput.css';

const SearchFormInput = memo(({ value, onChange, name }) => {
  return (
    <div className="search__input-wrapper">
      <input
        type="text"
        required
        className="search__input"
        placeholder="Фильм"
        value={value}
        onChange={onChange}
        name={name}
      />
      <button type="submit" className="search__button button-hover">
        Найти
      </button>
    </div>
  );
});

export default SearchFormInput;
