import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AuthFooter.css';

const AuthFooter = memo(
  ({
    buttonText,
    redirectTitle,
    redirectText,
    isValid,
    message,
    clearErrorMessage,
  }) => {
    const path = useLocation();

    const redirectPlace = useMemo(() => {
      if (path.pathname === '/signin') return '/signup';
      return '/signin';
    }, [path]);

    return (
      <div className="auth__footer">
        <span className="input__error-text">{message}</span>
        <button
          type="submit"
          className="auth__button button-hover"
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <div className="auth__redirect">
          <h4 className="auth__redirect_subtitle">{redirectTitle}</h4>
          <Link
            to={redirectPlace}
            className="auth__redirect_link"
            onClick={clearErrorMessage}
          >
            {redirectText}
          </Link>
        </div>
      </div>
    );
  }
);

export default AuthFooter;
