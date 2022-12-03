import { memo, useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as MainApi from '../../utils/MainApi';

import './App.css';
import InfoTooltip from '../Shared/InfoTooltip/InfoTooltip';

const App = memo(() => {
  const [currentUser, setCurrentUser] = useState({
    name: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] =
    useState(false);
  const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] =
    useState(false);

  const resetErrorMessage = useCallback(() => {
    setMessage('');
  }, []);

  const history = useHistory();

  useEffect(() => {
    const closeByEscape = evt => {
      if (evt.key === 'Escape') {
        setIsOpenMenu(false);
      }
    };
    if (isOpenMenu) {
      document.addEventListener('keydown', closeByEscape);
    } else {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [isOpenMenu]);

  const handleMenuButtonClick = useCallback(() => {
    setIsOpenMenu(true);
  }, []);
  const handleCloseMenuButtonClick = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setIsRegisterInfoTooltipOpen(true);
  }, []);
  const handleLoginClick = useCallback(() => {
    setIsLoginInfoTooltipOpen(true);
  }, []);
  const closeInfoTooltip = useCallback(() => {
    setIsRegisterInfoTooltipOpen(false);
    setIsLoginInfoTooltipOpen(false);
  }, []);

  const handleRegister = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then(res => {
        if (!res || res.status === 400) {
          throw new Error('Что-то пошло не так!');
        }
        if (res.data) {
          setIsSuccess(true);
          setLoggedIn(true);
          resetErrorMessage();
          history.push('/signin');
        }
        if (res.message) {
          throw new Error(res.message);
        }
      })
      .then(() => handleRegisterClick())
      .catch(err => {
        handleRegisterClick();
        setMessage(err.message || 'Что-то пошло не так!');
      });
  };

  const handleLogin = ({ email, password }) => {
    MainApi.authorize(email, password)
      .then(res => {
        if (!res || res.message) {
          throw new Error(
            'Неверный адрес электронной почты или пароль'
          );
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          resetErrorMessage();
          history.push('/movies');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        handleLoginClick();
        setMessage(err.message || 'Что-то пошло не так!');
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header openMenu={handleMenuButtonClick} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} message={message} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} message={message} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Navigation
          isOpen={isOpenMenu}
          closeMenu={handleCloseMenuButtonClick}
        />
        <Footer />
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isRegisterInfoTooltipOpen}
          onClose={closeInfoTooltip}
          successText="Вы успешно зарегестрированы"
          errorText={message}
        />
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isLoginInfoTooltipOpen}
          onClose={closeInfoTooltip}
          errorText={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
});

export default App;
