import React, { useState } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { GymIcon } from '../../assets/icons/GymIcon';

const Header: React.FC = () => {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurgerToggle = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <GymIcon className="header__image" />
          <span className="header__title">MR.OLIMPIA</span>
        </Link>
      </div>

      {/* Бургер-меню для планшетів та мобільних */}
      <div
        className={`header__burger ${isBurgerOpen ? 'header__burger--active' : ''}`}
        onClick={handleBurgerToggle}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </div>

      {/* Навігація */}
      <div className={`header__links ${isBurgerOpen ? 'header__links--open' : ''}`}>
        <Link to="/coach" className={location.pathname === "/coach" ? "active header__link" : "header__link"}>
          Тренери
        </Link>
        <Link to="/subscriptions" className={location.pathname === "/subscriptions" ? "active header__link" : "header__link"}>
          Абонементи
        </Link>
        <Link to="/comments" className={location.pathname === "/comments" ? "active header__link" : "header__link"}>
          Коментарі
        </Link>
        <Link to="/about" className={location.pathname === "/about" ? "active header__link" : "header__link"}>
          Про нас
        </Link>
      </div>
    </header>
  );
};

export default Header;
