import { memo } from 'react';

import './AboutProject.css';

const AboutProject = memo(() => {
  return (
    <section id="about-project" className="about-project__wrapper">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-group_wrapper">
        <div className="about-project__text-group">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__text-group">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__duration">
        <p className="about-project__duration-text about-project__duration-text_back-end">
          1 неделя
        </p>
        <p className="about-project__duration-text about-project__duration-text_front-end">
          4 недели
        </p>
      </div>
      <div className="about-project__duration">
        <p className="about-project__duration-text about-project__duration-text_back-end about-project__duration-text_clear-color">
          Back-end
        </p>
        <p className="about-project__duration-text about-project__duration-text_front-end about-project__duration-text_clear-color">
          Front-end
        </p>
      </div>
    </section>
  );
});

export default AboutProject;
