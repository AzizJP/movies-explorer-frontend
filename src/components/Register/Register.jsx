import { memo } from 'react';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Register.css';

const Register = memo(() => {
  return (
    <section className="register">
      <AuthHeader title={'Добро пожаловать'} />
      <AuthForm isLogin={false} />
      <AuthFooter
        buttonText="Зарегистрироваться"
        redirectTitle="Уже зарегистрированы?"
        redirectText="Войти"
      />
    </section>
  );
});

export default Register;
