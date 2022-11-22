import { memo } from 'react';
import {
  getWordEnding,
  getYearsOld,
} from '../../Shared/Functions/Functions';

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
      <div className="portfolio__about-me_wrapper">
        <img
          src="https://sun9-30.userapi.com/impf/c841327/v841327980/2550f/oUcGfWcf2-I.jpg?size=1280x812&quality=96&sign=de68715e0265db267d7c72d9bacc1fb7&type=album"
          alt="Фотография"
          className="portfolio__image"
        />
        <div className="portfolio__about-me">
          <h3 className="portfolio__about-me_name">Азиз</h3>
          <h4 className="portfolio__about-me_job">{`Фронтент-разработчик, ${getYearsOld()} ${getWordEnding(
            getYearsOld()
          )}`}</h4>
          <p className="portfolio__about-me_text">
            Родился в Туркмении, живу и развиваюсь в Санкт-Петербурге.
            Меня всегда тянуло сделать комфортней свою жизнь и жизнь
            людей, которые меня окружают. Сначала я направил силы в
            работу архитектором, а сейчас - фронтэнд-разработчиком...
          </p>
          <div>
            <a
              href="https://github.com/AzizJP"
              target="_blank"
              className="portfolio__about-me_link link-hover"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
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
