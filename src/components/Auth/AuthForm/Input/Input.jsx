import { memo } from 'react';

import './Input.css';

const Input = memo(
  ({
    title,
    errorText,
    isValid,
    minLength,
    maxLength,
    placeholder,
    value,
    onChange,
  }) => {
    return (
      <div className="input__wrapper">
        <h5 className="input__title">{title}</h5>
        <input
          minLength={minLength}
          maxLength={maxLength}
          required
          type="text"
          className={`input ${!isValid ? 'input__error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {!isValid ? (
          <p className="input__error-text">{errorText}</p>
        ) : null}
      </div>
    );
  }
);

export default Input;
