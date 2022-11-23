import { memo } from 'react';

import './AuthForm.css';
import Input from './Input/Input';

const AuthForm = memo(({ isLogin }) => {
  return (
    <div className="form__wrapper">
      <form id="form" className="form">
        {!isLogin ? (
          <Input title={'Имя'} errorText={'Что-то пошло не так...'} />
        ) : null}
        <Input
          title={'E-mail'}
          errorText={'Что-то пошло не так...'}
        />
        <Input
          title={'Пароль'}
          errorText={'Что-то пошло не так...'}
        />
      </form>
    </div>
  );
});

export default AuthForm;
