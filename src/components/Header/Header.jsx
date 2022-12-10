import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as ProfileIcon } from '../../images/profile.svg';
import './Header.css';

const Header = memo(({ openMenu, loggedIn }) => {
  if (!loggedIn) {
    return (
      <header className="header">
        <Link to="/" className="header__logo-link">
          <Logo className="header__logo-image" />
        </Link>
        <section className="header__authorization-section">
          <Link
            to="/signup"
            className="header__register-link link-hover"
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="header__login-link button-hover"
          >
            Войти
          </Link>
        </section>
      </header>
    );
  }
  return (
    <header className="header">
      <section className="header__links-section">
        <Link to="/" className="header__logo-link">
          <Logo className="header__logo-image" />
        </Link>
        <div className="header__links">
          <Link
            to="/movies"
            className="header__link header__link_font-type_medium link-hover"
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className="header__link link-hover"
          >
            Сохраненные фильмы
          </Link>
        </div>
      </section>
      <section className="header__profile-section">
        <Link
          to="/profile"
          className="header__profile-link link-hover"
        >
          Аккаунт
        </Link>
        <Link
          to="/profile"
          className="header__profile-button button-hover"
        >
          <ProfileIcon className="header__profile-icon" />
        </Link>
      </section>
      <button
        type="button"
        className="header__menu-button"
        onClick={openMenu}
      ></button>
    </header>
  );
});

export default Header;
