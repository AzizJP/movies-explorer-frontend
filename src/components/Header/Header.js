import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = memo(({ openMenu }) => {
  const path = useLocation();

  if (path.pathname === '/') {
    return (
      <header className="header">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Изображение логотипа" className="header__logo-image" />
        </Link>
        <section className="header__authorization-section">
          <Link to="/signup" className="header__register-link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__login-link">
            Войти
          </Link>
        </section>
      </header>
    );
  }
  if (
    path.pathname === '/movies' ||
    path.pathname === '/saved-movies' ||
    path.pathname === '/profile'
  ) {
    return (
      <header className="header">
        <section className="header__links-section">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="Изображение логотипа" className="header__logo-image" />
          </Link>
          <div className="header__links">
            <Link to="/movies" className="header__link header__link_font-type_medium">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__link">
              Сохраненные фильмы
            </Link>
          </div>
        </section>
        <section className="header__profile-section">
          <Link to="/profile" className="header__profile-link">
            Аккаунт
          </Link>
          <Link to="/profile" className="header__profile-button">
            <div className="header__profile-icon"></div>
          </Link>
        </section>
        <button type="button" className="header__menu-button" onClick={openMenu}></button>
      </header>
    );
  }
});

export default Header;
