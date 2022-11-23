import { memo } from 'react';

import AboutMe from '../AboutMe/AboutMe';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';

import './Portfolio.css';

const projects = [
  {
    name: 'Статичный сайт',
    link: 'https://github.com/AzizJP/how-to-learn',
  },
  {
    name: 'Адаптивный сайт',
    link: 'https://github.com/AzizJP/russian-travel',
  },
  {
    name: 'Одностраничное приложение',
    link: 'https://github.com/AzizJP/react-mesto-api-full',
  },
];

const Portfolio = memo(() => {
  return (
    <section id="student" className="portfolio__wrapper">
      <h2 className="title">Студент</h2>
      <AboutMe />
      <div className="portfolio__projects">
        <h5 className="portfolio__projects_title">Портфолио</h5>
        {projects.map(({ name, link }) => (
          <div key={name} className="portfolio__projects_underline">
            <a
              href={link}
              target="_blank"
              className="portfolio__projects_link-container"
              rel="noreferrer"
            >
              <h6 className="portfolio__projects_name">{name}</h6>
              <span className="portfolio__projects_image">
                <Arrow />
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Portfolio;
