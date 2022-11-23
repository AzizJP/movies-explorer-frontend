import { memo } from 'react';

import './Input.css';

const Input = memo(({ title, errorText }) => {
  return (
    <div className="input__wrapper">
      <h5 className="input__title">{title}</h5>
      <input type="text" className="input" />
      <p className="input__error">{errorText}</p>
    </div>
  );
});

export default Input;
