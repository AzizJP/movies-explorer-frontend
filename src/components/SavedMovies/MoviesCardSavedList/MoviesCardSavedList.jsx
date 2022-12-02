import { memo } from 'react';
import MoviesCardSaved from '../MoviesCardSaved/MoviesCardSaved';

/*it will changing to API*/
import { exampleData } from '../../../utils/exampleData';

/*styles in Movies/MoviesCardList*/
const MoviesCardSavedList = memo(() => {
  return (
    <section className="movies-list">
      {exampleData.map(({ id, image, title, duration, amISaved }) => (
        <MoviesCardSaved
          key={id}
          image={image}
          title={title}
          duration={duration}
          amISaved={amISaved}
        />
      ))}
    </section>
  );
});

export default MoviesCardSavedList;
