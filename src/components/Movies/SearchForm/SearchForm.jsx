import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFormInput from '../../Shared/SearchFormInput/SearchFormInput';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';

import './SearchForm.css';

const SearchForm = memo(() => {
  const [isToggled, setIsToggled] = useState(false);

  const path = useLocation();

  const handleToggleButtonClick = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  if (
    path.pathname === '/movies' ||
    path.pathname === '/saved-movies'
  ) {
    return (
      <section className="search">
        <form className="search__form">
          <SearchFormInput />
          <div className="search__toggler-wrapper">
            <h4 className="search__toggler-title">Короткометражки</h4>
            <ToggleCheckbox
              toggleCheckboxClick={handleToggleButtonClick}
              isToggled={isToggled}
            />
          </div>
        </form>
      </section>
    );
  }
});

export default SearchForm;
