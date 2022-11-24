import { memo } from 'react';
import Preloader from '../Preloader/Preloader';

import './MoreButton.css';

const MoreButton = memo(({ isLoading, showMoreCards }) => {
  return (
    <section className="more-button__wrapper">
      {isLoading ? (
        <Preloader />
      ) : (
        <button
          className="more-button button-hover"
          onClick={showMoreCards}
        >
          Ещё
        </button>
      )}
    </section>
  );
});

export default MoreButton;
