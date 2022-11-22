import { memo } from 'react';
import AboutProject from './AboutProject/AboutProject';

import './Main.css';
import Promo from './Promo/Promo';

const Main = memo(() => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
    </main>
  );
});

export default Main;
