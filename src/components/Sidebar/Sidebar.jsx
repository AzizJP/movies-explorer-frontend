import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profile.svg';
import './Sidebar.css';

const Sidebar = memo(({ isOpen, closeMenu }) => {
  const path = useLocation();
  if (
    path.pathname === '/movies' ||
    path.pathname === '/saved-movies' ||
    path.pathname === '/profile'
  ) {
    return (
      <section className={`sidebar ${isOpen ? 'sidebar_active' : ''}`}>
        <div className="sidebar__overlay" onClick={closeMenu} />
        <div className="sidebar__content">
          <button type="button" className="sidebar__close-icon" onClick={closeMenu}></button>
          <div className="sidebar__links">
            <Link
              to="/"
              className={`sidebar__link ${path.pathname === '/' ? 'sidebar__link_active' : ''}`}
              onClick={closeMenu}
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={`sidebar__link ${
                path.pathname === '/movies' ? 'sidebar__link_active' : ''
              }`}
              onClick={closeMenu}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`sidebar__link ${
                path.pathname === '/saved-movies' ? 'sidebar__link_active' : ''
              }`}
              onClick={closeMenu}
            >
              Сохраненные фильмы
            </Link>
          </div>
          <div className="sidebar__profile-section">
            <Link to="/profile" className="sidebar__profile-link" onClick={closeMenu}>
              Аккаунт
            </Link>
            <Link
              to="/profile"
              className="sidebar__profile-button button-hover"
              onClick={closeMenu}
            >
              <ProfileIcon className="sidebar__profile-icon" />
            </Link>
          </div>
        </div>
      </section>
    );
  }
});

export default Sidebar;
