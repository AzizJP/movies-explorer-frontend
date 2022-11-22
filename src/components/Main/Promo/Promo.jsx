import { memo } from 'react';
import NavTab from '../NavTab/NavTab';

import './Promo.css';

const Promo = memo(() => {
  return (
    <section className="promo__wrapper">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </section>
  );
});

export default Promo;
