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

const App = memo(() => {
  const [currentUser, setCurrentUser] = useState({
    name: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] =
    useState(false);
  const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] =
    useState(false);

  const history = useHistory();

  const resetForm = useCallback(() => {
    setCurrentUser({ name: '' });
    setPassword('');
    setEmail('');
    setMessage('');
  }, []);

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
    setIsRegisterInfoTooltipOpen(!isRegisterInfoTooltipOpen);
  }, [isRegisterInfoTooltipOpen]);
  const handleLoginClick = useCallback(() => {
    setIsLoginInfoTooltipOpen(!isLoginInfoTooltipOpen);
  }, [isLoginInfoTooltipOpen]);

  const handleRegister = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then(res => {
        if (!res || res.status === 400) {
          throw new Error('Что-то пошло не так!');
        }
        if (res.data) {
          setIsSuccess(true);
          setLoggedIn(true);
          resetForm();
          history.push('/signin');
        }
      })
      .then(() => handleRegisterClick())
      .catch(err =>
        setMessage(err.message || 'Что-то пошло не так!')
      );
  };

  const handleLogin = ({ email, password }) => {
    MainApi.authorize(email, password)
      .then(res => {
        if (!res || res.message) {
          setIsSuccess(false);
          handleLoginClick();
          throw new Error('Неправильное имя пользователя или пароль');
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          resetForm();
          history.push('/movies');
        }
      })
      .catch(err =>
        setMessage(err.message || 'Что-то пошло не так!')
      );
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
      </div>
    </CurrentUserContext.Provider>
  );
});

export default App;
