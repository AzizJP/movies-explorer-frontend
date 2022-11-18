import { memo, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

import './App.css';

const App = memo(() => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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

  return (
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
          <Profile name={'Азиз'} email={'aziz@yandex.ru'} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Navigation isOpen={isOpenMenu} closeMenu={handleCloseMenuButtonClick} />
      <Footer />
    </div>
  );
});

export default App;
