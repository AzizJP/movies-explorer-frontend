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
import InfoTooltip from '../Shared/InfoTooltip/InfoTooltip';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';
import * as MainApi from '../../utils/MainApi';
import { parseJwt } from '../../utils/helpers';

import './App.css';
import { useMemo } from 'react';

const App = memo(() => {
  const history = useHistory();
  const isTokenValid = useMemo(() => {
    const jwt = localStorage.getItem('token');
    if (!jwt) return;
    const kek = parseJwt(jwt);
    return Date.now() / 1000 < kek.exp;
  }, []);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isTokenValid);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] =
    useState(false);
  const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] =
    useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [savedMoviesState, setSavedMoviesState] = useState([]);

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
  const handleErrorMessageChange = useCallback(errorMessage => {
    setMessage(errorMessage);
  }, []);
  const handleSavedMoviesChange = useCallback(newMovies => {
    setSavedMoviesState(newMovies);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setIsRegisterInfoTooltipOpen(true);
  }, []);
  const handleLoginClick = useCallback(() => {
    setIsLoginInfoTooltipOpen(true);
  }, []);
  const handleInfoTooltip = useCallback(() => {
    setInfoTooltipOpen(true);
  }, []);
  const closeInfoTooltip = useCallback(() => {
    setIsRegisterInfoTooltipOpen(false);
    setIsLoginInfoTooltipOpen(false);
    setInfoTooltipOpen(false);
  }, []);

  const exitFromAccount = useCallback(() => {
    setLoggedIn(false);
    localStorage.clear();
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
        }
        if (res.message) {
          throw new Error(res.message);
        }
      })
      .then(() => {
        handleLogin({ email, password });
        handleRegisterClick();
      })
      .catch(err => {
        handleRegisterClick();
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
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
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
      });
  };

  const handleProfileUpdate = ({ name, email, token }) => {
    MainApi.updateProfile(name, email, token)
      .then(res => {
        if (res.status === 400 || res.message) {
          throw new Error();
        }
        if (res) {
          setCurrentUser({ name: res.name, email: res.email });
          resetErrorMessage();
        }
      })
      .catch(err => {
        handleInfoTooltip();
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
      });
  };

  const resetErrorMessage = useCallback(() => {
    handleErrorMessageChange('');
  }, [handleErrorMessageChange]);

  const tokenCheck = useCallback(
    token =>
      MainApi.getContent(token).then(res => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({ name: res.name, email: res.email });
        }
        if (res.message) {
          exitFromAccount();
          history.push('/signin');
        }
      }),
    [history, exitFromAccount]
  );

  useEffect(() => {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      tokenCheck(jwt);
    }
  }, [loggedIn, tokenCheck]);

  useEffect(() => {
    loggedIn &&
      MainApi.getMovies()
        .then(res => {
          if (!res || res.status === 400) {
            throw new Error('Что-то пошло не так!');
          }
          if (res) {
            handleSavedMoviesChange(res);
          }
        })
        .catch(err => {
          handleInfoTooltip();
          handleErrorMessageChange(
            err.message || 'Что-то пошло не так!'
          );
        });
  }, [
    handleErrorMessageChange,
    handleInfoTooltip,
    handleSavedMoviesChange,
    loggedIn,
  ]);

  const handleAddSavedMovie = useCallback(
    movie => {
      MainApi.addToFavorite(movie)
        .then(newMovie => {
          handleSavedMoviesChange([newMovie, ...savedMoviesState]);
        })
        .catch(err => {
          console.log(err);
        });
      return;
    },
    [handleSavedMoviesChange, savedMoviesState]
  );

  const handleDeleteMovie = useCallback(
    id => {
      handleSavedMoviesChange(prev =>
        prev.filter(movie => movie._id !== id)
      );
      MainApi.deleteFromFavorite(id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      return;
    },
    [handleSavedMoviesChange]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          openMenu={handleMenuButtonClick}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            savedMoviesState={savedMoviesState}
            handleDeleteMovie={handleDeleteMovie}
            handleAddSavedMovie={handleAddSavedMovie}
            handleInfoTooltip={handleInfoTooltip}
            handleErrorMessageChange={handleErrorMessageChange}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMoviesState={savedMoviesState}
            handleDeleteMovie={handleDeleteMovie}
            handleSavedMoviesChange={handleSavedMoviesChange}
            handleInfoTooltip={handleInfoTooltip}
            handleErrorMessageChange={handleErrorMessageChange}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            profileInfo={currentUser}
            exitFromAccount={exitFromAccount}
            updateProfileInfo={handleProfileUpdate}
          />
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              message={message}
              clearErrorMessage={resetErrorMessage}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              message={message}
              clearErrorMessage={resetErrorMessage}
            />
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
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={infoTooltipOpen}
          onClose={closeInfoTooltip}
          errorText={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
});

export default App;
