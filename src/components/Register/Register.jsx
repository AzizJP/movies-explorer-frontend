import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AuthFooter from '../Auth/AuthFooter/AuthFooter';
import AuthForm from '../Auth/AuthForm/AuthForm';
import AuthHeader from '../Auth/AuthHeader/AuthHeader';

import './Register.css';

const Register = memo(() => {
  const history = useHistory();

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      history.push('/signin');
    },
    [history]
  );

  return (
    <form className="register" onSubmit={handleSubmit}>
      <AuthHeader title={'Добро пожаловать'} />
      <AuthForm isLogin={false} />
      <AuthFooter
        buttonText="Зарегистрироваться"
        redirectTitle="Уже зарегистрированы?"
        redirectText="Войти"
      />
    </form>
  );
});

export default Register;
