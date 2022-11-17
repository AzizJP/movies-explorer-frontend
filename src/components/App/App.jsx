import { memo, useCallback, useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Navigation from '../Navigation/Navigation';
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
      <Main />
      <Switch></Switch>
      <Navigation isOpen={isOpenMenu} closeMenu={handleCloseMenuButtonClick} />
      <Footer />
    </div>
  );
});

export default App;
