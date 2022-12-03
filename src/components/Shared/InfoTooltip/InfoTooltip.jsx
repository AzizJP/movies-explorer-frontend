import { memo } from 'react';

import './InfoTooltip.css';

const InfoTooltip = memo(
  ({ isSuccess, onClose, isOpen, successText, errorText }) => {
    return (
      <div
        className={`popup ${isOpen ? 'popup_opened' : ''}`}
        onClick={onClose}
      >
        <div
          className="popup__container"
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <div
            className={`popup__info-tooltip ${
              !isSuccess ? 'popup__info-tooltip_type_error' : ''
            }`}
          ></div>
          <h3 className={'popup__info-tooltip_title'}>
            {isSuccess ? successText : errorText}
          </h3>
          <button
            type="button"
            id="popup__close"
            className="popup__close"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </div>
      </div>
    );
  }
);

export default InfoTooltip;
