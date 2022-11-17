import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile.svg';
import './Navigation.css';

const Navigation = memo(({ isOpen, closeMenu }) => {
  const path = useLocation();
  if (
    path.pathname === '/movies' ||
    path.pathname === '/saved-movies' ||
    path.pathname === '/profile'
  ) {
    return (
      <section className={`navigation ${isOpen ? 'navigation_active' : ''}`}>
        <div className="navigation__overlay" onClick={closeMenu} />
        <div className="navigation__content">
          <button
            type="button"
            className="navigation__close-icon"
            onClick={closeMenu}
          ></button>
          <div className="navigation__links">
            <Link
              to="/"
              className={`navigation__link ${
                path.pathname === '/' ? 'navigation__link_active' : ''
              }`}
              onClick={closeMenu}
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={`navigation__link ${
                path.pathname === '/movies' ? 'navigation__link_active' : ''
              }`}
              onClick={closeMenu}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`navigation__link ${
                path.pathname === '/saved-movies'
                  ? 'navigation__link_active'
                  : ''
              }`}
              onClick={closeMenu}
            >
              Сохраненные фильмы
            </Link>
          </div>
          <div className="navigation__profile-section">
            <Link
              to="/profile"
              className="navigation__profile-link"
              onClick={closeMenu}
            >
              Аккаунт
            </Link>
            <Link
              to="/profile"
              className="navigation__profile-button button-hover"
              onClick={closeMenu}
            >
              <ProfileIcon className="navigation__profile-icon" />
            </Link>
          </div>
        </div>
      </section>
    );
  }
});

export default Navigation;
