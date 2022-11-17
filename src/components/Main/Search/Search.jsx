import { memo, useCallback, useState } from 'react';
import SearchForm from '../../Shared/SearchForm/SearchForm';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';

import './Search.css';

const Search = memo(() => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleButtonClick = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  console.log(isToggled);

  return (
    <section className="search">
      <form className="search__form">
        <SearchForm />
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
});

export default Search;
