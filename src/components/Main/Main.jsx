import { memo } from 'react';

import './Main.css';
import Promo from './Promo/Promo';

const Main = memo(() => {
  return (
    <main className="main">
      <Promo />
    </main>
  );
});

export default Main;
