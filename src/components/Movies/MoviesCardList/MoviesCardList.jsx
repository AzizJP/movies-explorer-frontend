import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

/*it will changing to API*/
import { exampleData } from '../../../utils/exampleData';

const MoviesCardList = memo(() => {
  return (
    <section className="movies-list">
      {exampleData.map(({ id, image, title, duration, inSaved }) => (
        <MoviesCard
          key={id}
          image={image}
          title={title}
          duration={duration}
          inSaved={inSaved}
        />
      ))}
    </section>
  );
});

export default MoviesCardList;
