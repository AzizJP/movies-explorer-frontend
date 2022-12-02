import { memo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../images/logo.svg';

import './AuthHeader.css';

const AuthHeader = memo(({ title }) => {
  return (
    <div className="auth__header">
      <Link to="/" className="auth__logo-link">
        <Logo className="auth__logo-image" />
      </Link>
      <h2 className="auth__title">{title}</h2>
    </div>
  );
});

export default AuthHeader;
