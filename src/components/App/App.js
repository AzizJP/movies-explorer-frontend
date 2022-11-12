import { memo, useCallback, useState } from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

const App = memo(() => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenuButtonClick = useCallback(() => {
    setIsOpenMenu(true);
  }, []);
  const handleCloseMenuButtonClick = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  return (
    <div className="page">
      <Header openMenu={handleMenuButtonClick} />
      <Switch></Switch>
      <Sidebar isOpen={isOpenMenu} closeMenu={handleCloseMenuButtonClick} />
    </div>
  );
});

export default App;
