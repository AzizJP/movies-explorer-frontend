import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Login.css';

const Login = memo(() => {
  const history = useHistory();

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      history.push('/movies');
    },
    [history]
  );

  return (
    <form className="login" onSubmit={handleSubmit}>
      <AuthHeader title={'Рады видеть'} />
      <AuthForm isLogin={true} />
      <AuthFooter
        buttonText="Войти"
        redirectTitle="Ещё не зарегистрированы?"
        redirectText="Регистрация"
      />
    </form>
  );
});

export default Login;
