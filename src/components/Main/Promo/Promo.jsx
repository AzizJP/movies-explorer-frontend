import { memo } from 'react';
import NavTab from '../NavTab/NavTab';

import './Promo.css';

const Promo = memo(() => {
  return (
    <section className="promo__wrapper">
      <div className="promo__background">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </section>
  );
});

export default Promo;
