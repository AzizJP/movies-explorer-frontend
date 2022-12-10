import {
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
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

import './App.css';

const App = memo(() => {
  const history = useHistory();
  const isTokenValid = useMemo(() => {
    const jwt = localStorage.getItem('token');
    if (!jwt) return false;
    return true;
  }, []);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    id: '',
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
  const [profileInfoTooltipOpen, setProfileInfoTooltipOpen] =
    useState(false);
  const [savedMoviesState, setSavedMoviesState] = useState([]);
  const [isRequestingServer, setIsRequestingServer] = useState(false);

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
  const handleRequestingServerChange = useCallback(isLoading => {
    setIsRequestingServer(isLoading);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setIsRegisterInfoTooltipOpen(true);
  }, []);
  const handleLoginClick = useCallback(() => {
    setIsLoginInfoTooltipOpen(true);
  }, []);
  const handleUpdateProfileClick = useCallback(() => {
    setProfileInfoTooltipOpen(true);
  }, []);
  const handleInfoTooltip = useCallback(() => {
    setInfoTooltipOpen(true);
  }, []);
  const closeInfoTooltip = useCallback(() => {
    setMessage('');
    setIsRegisterInfoTooltipOpen(false);
    setIsLoginInfoTooltipOpen(false);
    setProfileInfoTooltipOpen(false);
    setInfoTooltipOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  }, []);

  const isOpen =
    isOpenMenu ||
    isRegisterInfoTooltipOpen ||
    isLoginInfoTooltipOpen ||
    profileInfoTooltipOpen ||
    infoTooltipOpen;

  const closeAllPopups = useCallback(() => {
    setIsOpenMenu(false);
    closeInfoTooltip();
  }, [closeInfoTooltip]);

  useEffect(() => {
    const closeByEscape = evt => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
    } else {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [closeAllPopups, isOpen]);

  const exitFromAccount = useCallback(() => {
    setLoggedIn(false);
    localStorage.clear();
  }, []);

  const handleRegister = ({ name, email, password }, clearForm) => {
    setIsRequestingServer(true);
    MainApi.register(name, email, password)
      .then(res => {
        if (!res || res.status === 400) {
          throw new Error('Что-то пошло не так!');
        }
        if (res.data) {
          setIsSuccess(true);
          resetErrorMessage();
        }
        if (res.message) {
          throw new Error(res.message);
        }
      })
      .then(() => {
        handleLogin({ email, password }, clearForm);
        clearForm();
        handleRegisterClick();
      })
      .catch(err => {
        handleRegisterClick();
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
        setTimeout(() => {
          setIsRequestingServer(false);
        }, 300);
      });
  };

  const handleLogin = ({ email, password }, clearForm) => {
    setIsRequestingServer(true);
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
          clearForm();
          resetErrorMessage();
          history.push('/movies');
        }
      })
      .catch(err => {
        setIsSuccess(false);
        handleLoginClick();
        setTimeout(() => {
          setIsRequestingServer(false);
        }, 300);
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
      });
  };

  const handleProfileUpdate = ({ name, email, token }) => {
    setIsRequestingServer(true);
    MainApi.updateProfile(name, email, token)
      .then(res => {
        if (res.status === 400 || res.message) {
          throw new Error(res.message);
        }
        if (res) {
          setCurrentUser({
            name: res.name,
            email: res.email,
            id: res._id,
          });
          setIsSuccess(true);
          resetErrorMessage();
        }
      })
      .then(() => {
        handleUpdateProfileClick();
      })
      .catch(err => {
        handleInfoTooltip();
        handleErrorMessageChange(
          err.message || 'Что-то пошло не так!'
        );
      })
      .finally(() => {
        setTimeout(() => {
          setIsRequestingServer(false);
        }, 300);
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
          setCurrentUser(res);
        }
        if (res.message) {
          exitFromAccount();
        }
      }),
    [exitFromAccount]
  );

  useEffect(() => {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      tokenCheck(jwt);
    }
    if (!jwt) {
      exitFromAccount();
    }
  }, [exitFromAccount, loggedIn, tokenCheck]);

  useEffect(() => {
    loggedIn &&
      MainApi.getMovies()
        .then(res => {
          if (!res || res.message) {
            throw new Error('Что-то пошло не так!');
          }
          if (res) {
            handleSavedMoviesChange(res.reverse());
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
      setIsRequestingServer(true);
      if (isRequestingServer) return;
      MainApi.addToFavorite(movie)
        .then(newMovie => {
          handleSavedMoviesChange([newMovie, ...savedMoviesState]);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsRequestingServer(false);
        });
      return;
    },
    [handleSavedMoviesChange, isRequestingServer, savedMoviesState]
  );

  const handleDeleteMovie = useCallback(
    id => {
      setIsRequestingServer(true);
      handleSavedMoviesChange(prev =>
        prev.filter(movie => movie._id !== id)
      );
      MainApi.deleteFromFavorite(id)
        .then(res => {
          console.log(res.message);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setIsRequestingServer(false);
          }, 300);
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
            isRequestingServer={isRequestingServer}
            handleRequestingServerChange={
              handleRequestingServerChange
            }
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            initialMoviesState={savedMoviesState}
            handleInitialMoviesChange={handleSavedMoviesChange}
            handleDeleteMovie={handleDeleteMovie}
            handleInfoTooltip={handleInfoTooltip}
            handleErrorMessageChange={handleErrorMessageChange}
            isRequestingServer={isRequestingServer}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            profileInfo={currentUser}
            exitFromAccount={exitFromAccount}
            updateProfileInfo={handleProfileUpdate}
            isRequestingServer={isRequestingServer}
          />
          <Route path="/signup">
            {loggedIn ? <Redirect to="/" /> : null}
            <Register
              onRegister={handleRegister}
              message={message}
              clearErrorMessage={resetErrorMessage}
              isRequestingServer={isRequestingServer}
            />
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : null}
            <Login
              onLogin={handleLogin}
              message={message}
              clearErrorMessage={resetErrorMessage}
              isRequestingServer={isRequestingServer}
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
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={profileInfoTooltipOpen}
          onClose={closeInfoTooltip}
          successText="Данные успешно изменены"
          errorText={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
});

export default App;
