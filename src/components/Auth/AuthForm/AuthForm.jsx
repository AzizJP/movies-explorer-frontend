import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Input from './Input/Input';

import './AuthForm.css';

const AuthForm = memo(({ isLogin, children }) => {
  const history = useHistory();

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      history.push('/signin');
    },
    [history]
  );

  return (
    <div className="form__wrapper">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <div className="form__inputs">
          {!isLogin ? (
            <Input
              id="name"
              minLength={2}
              maxLength={30}
              title={'Имя'}
              placeholder={'Введите имя'}
              isValid={true}
              errorText={'Что-то пошло не так...'}
            />
          ) : null}
          <Input
            id="email"
            minLength={2}
            title={'E-mail'}
            placeholder={'Введите email'}
            isValid={true}
            errorText={'Что-то пошло не так...'}
          />
          <Input
            id="password"
            title={'Пароль'}
            placeholder={'Введите пароль'}
            isValid={false}
            errorText={'Что-то пошло не так...'}
          />
        </div>
        {children}
      </form>
    </div>
  );
});

export default AuthForm;
