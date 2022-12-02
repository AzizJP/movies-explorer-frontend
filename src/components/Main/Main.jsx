import { memo } from 'react';

import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portfolio';

import './Main.css';

const Main = memo(() => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
});

export default Main;
