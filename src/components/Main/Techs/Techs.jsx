import { memo } from 'react';

import './Techs.css';

const techs = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];

const Techs = memo(() => {
  return (
    <section id="techs" className="techs__wrapper">
      <h2 className="title techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые
        применили в дипломном проекте.
      </p>
      <div className="techs__list">
        {techs.map(tech => {
          return (
            <div key={tech} className="techs__list-item">
              {tech}
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default Techs;
