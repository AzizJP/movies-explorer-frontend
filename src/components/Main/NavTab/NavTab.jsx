import { memo } from 'react';

import './NavTab.css';

const NavTab = memo(() => {
  return (
    <div className="nav-tab__wrapper">
      <a href="#about-project" className="nav-tab__link button-hover">
        О проекте
      </a>
      <a href="#techs" className="nav-tab__link button-hover">
        Технологии
      </a>
      <a href="#student" className="nav-tab__link button-hover">
        Студент
      </a>
    </div>
  );
});

export default NavTab;
