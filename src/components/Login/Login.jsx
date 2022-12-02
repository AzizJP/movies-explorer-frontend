import { memo, useCallback } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Login.css';

const Login = memo(({ onLogin, isRequesting }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
  } = useFormWithValidation(
    {
      'email': '',
      'password': '',
    },
    {
      'email': '',
      'password': '',
    },
    {
      'email': false,
      'password': false,
    }
  );

  const clearForm = useCallback(() => {
    setValues({});
    resetForm(
      { 'email': '', 'password': '' },
      { 'email': '', 'password': '' }
    );
  }, [setValues, resetForm]);

  const handleSubmit = evt => {
    evt.preventDefault();
    onLogin({
      email: values['email'],
      password: values['password'],
    });
    clearForm();
  };
  return (
    <section className="login">
      <AuthHeader title={'Рады видеть'} />
      <AuthForm
        onSubmit={handleSubmit}
        emailValue={values['email']}
        emailValidationErrorMessage={errors['email']}
        isEmailValid={isValid['email']}
        passwordValue={values['password']}
        passwordValidationErrorMessage={errors['password']}
        isPasswordValid={isValid['password']}
        handleChange={handleChange}
        isLogin={true}
      >
        <AuthFooter
          buttonText="Войти"
          redirectTitle="Ещё не зарегистрированы?"
          redirectText="Регистрация"
          isValid={isValid['email'] && isValid['password']}
        />
      </AuthForm>
    </section>
  );
});

export default Login;
