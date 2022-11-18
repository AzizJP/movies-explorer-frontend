import { memo } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = memo(() => {
  return (
    <section className="not-found">
      <div className="not-found__message">
        <h2 className="not-found__status">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link to="/" className="not-found__link">
        Назад
      </Link>
    </section>
  );
});

export default NotFound;
