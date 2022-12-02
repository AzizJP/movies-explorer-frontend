import { memo, useCallback } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Register.css';

const Register = memo(({ onRegister, isRequesting }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
  } = useFormWithValidation(
    {
      'name': '',
      'email': '',
      'password': '',
    },
    {
      'name': '',
      'email': '',
      'password': '',
    },
    {
      'name': false,
      'email': false,
      'password': false,
    }
  );

  const clearForm = useCallback(() => {
    setValues({});
    resetForm(
      { 'name': '', 'email': '', 'password': '' },
      { 'name': '', 'email': '', 'password': '' }
    );
  }, [setValues, resetForm]);

  const handleSubmit = evt => {
    evt.preventDefault();
    onRegister({
      name: values['name'],
      email: values['email'],
      password: values['password'],
    });
    clearForm();
  };

  return (
    <section className="register">
      <AuthHeader title={'Добро пожаловать'} />
      <AuthForm
        onSubmit={handleSubmit}
        nameValue={values['name']}
        nameValidationErrorMessage={errors['name']}
        isNameValid={isValid['name']}
        emailValue={values['email']}
        emailValidationErrorMessage={errors['email']}
        isEmailValid={isValid['email']}
        passwordValue={values['password']}
        passwordValidationErrorMessage={errors['password']}
        isPasswordValid={isValid['password']}
        handleChange={handleChange}
        isLogin={false}
      >
        <AuthFooter
          buttonText="Зарегистрироваться"
          redirectTitle="Уже зарегистрированы?"
          redirectText="Войти"
          isValid={
            isValid['name'] && isValid['email'] && isValid['password']
          }
        />
      </AuthForm>
    </section>
  );
});

export default Register;
