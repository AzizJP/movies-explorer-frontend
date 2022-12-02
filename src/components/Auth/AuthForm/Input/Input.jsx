import { memo } from 'react';

import './Input.css';

const Input = memo(
  ({
    inputName,
    title,
    errorText,
    isValid,
    minLength,
    maxLength,
    placeholder,
    value,
    onChange,
    type,
  }) => {
    return (
      <div className="input__wrapper">
        <h5 className="input__title">{title}</h5>
        <input
          minLength={minLength}
          maxLength={maxLength}
          required
          type={type}
          className={`input ${!isValid ? 'input__error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={inputName}
        />
        <span className="input__error-text">{errorText}</span>
      </div>
    );
  }
);

export default Input;
