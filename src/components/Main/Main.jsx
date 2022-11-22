import { memo } from 'react';

import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';

import './Main.css';
import Techs from './Techs/Techs';

const Main = memo(() => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  );
});

export default Main;
