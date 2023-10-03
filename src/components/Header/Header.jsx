import './Header.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  const location = useLocation();
  const rootPath = "/";

  return (
    <header className={location.pathname !== '/' ? "header header_color-white" : "header"}>
      <div className="header__container">
        <Link className="header__logo-link" to={rootPath}>
          <img className="header__logo" src={logo} alt="Логотип" />
        </Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
};

export default Header;
