import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = memo(({ isOpen, closeMenu }) => {
  return (
    <section className={`sidebar ${isOpen ? 'sidebar_active' : ''}`}>
      <div className="sidebar__overlay" />
      <div className="sidebar__content">
        <button type="button" className="" onClick={closeMenu}>
          х
        </button>
        <div>
          <Link>Главная</Link>
          <Link>Фильмы</Link>
          <Link>Сохраненные фильмы</Link>
        </div>
        <div>
          <Link>Аккаунт</Link>
          <button>з</button>
        </div>
      </div>
    </section>
  );
});

export default Sidebar;
