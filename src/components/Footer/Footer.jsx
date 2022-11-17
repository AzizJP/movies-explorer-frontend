import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = memo(() => {
  const path = useLocation();

  if (
    path.pathname === '/movies' ||
    path.pathname === '/saved-movies' ||
    path.pathname === '/'
  ) {
    return (
      <footer className="footer">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <section className="footer__author">
          <div className="footer__links">
            <Link to="/" className="footer__link link-hover">
              Джумаев Азиз
            </Link>
            <a
              href="https://github.com/AzizJP"
              target="_blank"
              className="footer__link link-hover"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <span className="footer__copyright">
            &copy;{new Date().getFullYear()}
          </span>
        </section>
      </footer>
    );
  }
});

export default Footer;
