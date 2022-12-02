import { memo } from 'react';

import Input from './Input/Input';

import './AuthForm.css';

const AuthForm = memo(
  ({
    onSubmit,
    nameValue,
    nameValidationErrorMessage,
    isNameValid,
    emailValue,
    emailValidationErrorMessage,
    isEmailValid,
    passwordValue,
    passwordValidationErrorMessage,
    isPasswordValid,
    handleChange,
    isLogin,
    children,
  }) => {
    return (
      <div className="form__wrapper">
        <form
          id="form"
          noValidate
          className="form"
          onSubmit={onSubmit}
        >
          <div className="form__inputs">
            {!isLogin ? (
              <Input
                id="name"
                minLength={2}
                maxLength={30}
                inputName="name"
                title={'Имя'}
                placeholder={'Введите имя'}
                isValid={isNameValid}
                errorText={nameValidationErrorMessage}
                value={nameValue}
                onChange={handleChange}
                type="text"
              />
            ) : null}
            <Input
              id="email"
              minLength={2}
              inputName="email"
              title={'E-mail'}
              placeholder={'Введите email'}
              isValid={isEmailValid}
              errorText={emailValidationErrorMessage}
              value={emailValue}
              onChange={handleChange}
              type="email"
            />
            <Input
              id="password"
              inputName="password"
              title={'Пароль'}
              placeholder={'Введите пароль'}
              isValid={isPasswordValid}
              errorText={passwordValidationErrorMessage}
              value={passwordValue}
              onChange={handleChange}
              type="text"
            />
          </div>
          {children}
        </form>
      </div>
    );
  }
);

export default AuthForm;
