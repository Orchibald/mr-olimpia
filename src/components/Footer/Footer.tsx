import { Link } from 'react-router-dom';
import './Footer.scss';
import { GymIcon } from '../../assets/icons/GymIcon';
import { BackToTop } from '../../assets/icons/BackToTop';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <Link to="/">
          <GymIcon className='footer__image'/>
        </Link>

        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/Orchibald"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>

          <li className="footer__item">
            <a
              href="www.linkedin.com/in/orestkozak2003"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>

          <li className="footer__item">
            <a
              href="https://orestkozakki2021.wixsite.com/orchibaldweb"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Портфоліо
            </a>
          </li>
        </ul>

        <div className="footer__anchor">
          <button
            className='footer__up-btn'
            onClick={() => window.scrollTo(0, 0)}
          >
            <BackToTop />
          </button>
          <span className="footer__anchor-text">Початок</span>
        </div>
      </div>
    </footer>
  );
};