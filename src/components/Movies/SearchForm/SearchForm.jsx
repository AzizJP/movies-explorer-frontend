import { memo, useCallback, useState } from 'react';
import SearchFormInput from '../../Shared/SearchFormInput/SearchFormInput';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';

import './SearchForm.css';

const SearchForm = memo(({ value, handleChange, handleSubmit }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleButtonClick = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  return (
    <section className="search">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="search__form"
      >
        <SearchFormInput value={value} onChange={handleChange} />
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

export default SearchForm;
