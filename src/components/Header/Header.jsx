import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn, handelOpenSmallNav }) {
  const rootPath = '/'
  return (
    <header className="header">
      <Link className="header__logo-link" to={rootPath}>
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <Navigation handelOpenBurger={handelOpenSmallNav} isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
