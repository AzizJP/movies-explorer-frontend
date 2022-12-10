import { memo } from 'react';

import './MoreButton.css';

const MoreButton = memo(({ showMoreCards }) => {
  return (
    <section className="more-button__wrapper">
      <button
        className="more-button button-hover"
        onClick={showMoreCards}
      >
        Ещё
      </button>
    </section>
  );
});

export default MoreButton;
