import './NavPanelRegistered.css';
import React from "react";
import {NavLink, Link } from "react-router-dom";
import manIcon from "../../../images/man-icon.svg";

function NavPanelRegistered({isDesktop}) {
  return (
    <nav className="nav">
      <ul className="nav__links-list" aria-label="Ссылки на страницы">
        <li>
          <NavLink className={({ isActive }) => `nav__link nav__link-main ${isActive && !isDesktop && 'nav__link_active'}`} to="/">
            Главная
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav__link ${isActive && !isDesktop && 'nav__link_active'}`} to="/movies">
            Фильмы
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav__link ${isActive && !isDesktop && 'nav__link_active'}`} to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </li>

        <li className="nav__list-item-account">
          <Link className="nav__link nav__link-account" to="/profile">
            <img src={manIcon} alt="Иконка человека"/>
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanelRegistered;
