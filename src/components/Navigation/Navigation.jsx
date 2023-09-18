import React from "react";
import { Link, NavLink } from "react-router-dom";
import manIcon from "../../images/man-icon.svg";
import smallNavIcon from "../../images/small-nav-icon.svg";

function Navigation({ handelOpenSmallNav, isLoggedIn }) {
  return isLoggedIn ? (
    <nav className="nav">
      <ul className="nav__movies">
        <li>
          <NavLink className="nav__link nav__route nav__route_active" to="/movies">
            Фильм
          </NavLink>
        </li>

        <li>
          <NavLink className="nav__link nav__route" to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>

      <Link to="/profile" className="nav__route nav__route-account">
        <img className="nav__main-icon" src={manIcon} alt="Иконка человека"/>
        Аккаунт
      </Link>

      <img className="nav__small-nav" src={smallNavIcon} onClick={handelOpenSmallNav}
           alt="Иконка кнопки меню"
      />
    </nav>
  ) : (
    <nav className="nav__default">
      <Link className="nav__route" to="/signup" >
        Регистрация
      </Link>
      <Link className="nav__route nav__route-btn" to="/signin" >
        Войти
      </Link>
    </nav>
  );
}

export default Navigation;
