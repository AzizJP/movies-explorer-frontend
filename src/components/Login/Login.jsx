import { memo } from 'react';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Login.css';

const Login = memo(() => {
  return (
    <section className="login">
      <AuthHeader title={'Рады видеть'} />
      <AuthForm isLogin={true} />
      <AuthFooter
        buttonText="Войти"
        redirectTitle="Ещё не зарегистрированы?"
        redirectText="Регистрация"
      />
    </section>
  );
});

export default Login;
