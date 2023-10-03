import './Navigation.css';
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import NavPanelRegistered from "./NavPanelRegistered/NavPanelRegistered";
import BurgerOpened from "./BurgerActive/BurgerOpened";
import { useWindowSize } from "../../contexts/WindowSizeContext";

function Navigation({ isLoggedIn }) {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const handleMenu = () => {
    setBurgerOpened(!burgerOpened);
  };
  const { isDesktop } = useWindowSize();

  // Сброс открытого состояния бургерного меню
  useEffect(() => {
    if (isDesktop) {
      setBurgerOpened(false);
    }
  }, [isDesktop]);

  return isLoggedIn ? (
    <>
      {isDesktop ? (
        <NavPanelRegistered isDesktop={isDesktop} />
      ) : (
        <button className="burger-menu-btn" type="button" onClick={handleMenu}></button>
      )}
      {!isDesktop && <BurgerOpened burgerOpened={burgerOpened} onCloseBurger={handleMenu} />}
    </>
  ) : (
    <nav className="nav-default">
      <Link className="nav-default__link" to="/register" >Регистрация</Link>
      <Link className="nav-default__link nav-default__link-btn" to="/login" >Войти</Link>
    </nav>
  );
}

export default Navigation;
