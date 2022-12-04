import { memo } from 'react';
import { getWordEnding, getYearsOld } from '../../../utils/helpers';

import './AboutMe.css';

const AboutMe = memo(() => {
  return (
    <div className="about-me__wrapper">
      <img
        src="https://sun9-30.userapi.com/impf/c841327/v841327980/2550f/oUcGfWcf2-I.jpg?size=1280x812&quality=96&sign=de68715e0265db267d7c72d9bacc1fb7&type=album"
        alt="Фотография"
        className="about-me__image"
      />
      <div className="about-me">
        <h3 className="about-me__name">Азиз</h3>
        <h4 className="about-me__job">{`Фронтент-разработчик, ${getYearsOld()} ${getWordEnding(
          getYearsOld()
        )}`}</h4>
        <p className="about-me__text">
          Родился в Туркмении, живу и развиваюсь в Санкт-Петербурге.
          Меня всегда тянуло сделать комфортней свою жизнь и жизнь
          людей, которые меня окружают. Сначала я направил силы в
          работу архитектором, а сейчас - фронтэнд-разработчиком...
        </p>
        <div>
          <a
            href="https://github.com/AzizJP"
            target="_blank"
            className="about-me__link link-hover"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;
