import './Login.css';
import React, {useContext, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

function Login() {
  const currentUser = useContext(CurrentUserContext)
  const isError = true // TODO временная заглушка
  // TODO временная заглушка для валидации
  const [errorText, setErrorText] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleInputChange = (e) =>  {
    const input = e.target;
    if (!input.checkValidity()) {
      if (input.name === 'email') {
        setEmailError(input.validationMessage);
        setErrorText(input.validationMessage);
      } else if (input.name === 'password') {
        setPasswordError(input.validationMessage);
        setErrorText(input.validationMessage);
      }
    } else {
      if (input.name === 'email') {
        setEmailError('');
        setErrorText('');
      } else if (input.name === 'password') {
        setPasswordError('');
        setErrorText('');
      }
    }
  };

  return (
    <section className="register">
      <div className="register__container" >
        <Link className="register__logo-link" to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="register__title">Рады видеть!</h2>
        <form className="register__form" name="profile">
          <label className="register__label">E-mail
            <input className="register__input" placeholder={currentUser.email} name="email" type="email" required
                   onChange={handleInputChange}/>
          </label>
          <span className="register__input-error">{emailError && errorText}</span>
          <label className="register__label">Пароль
            <input className="register__input register__input_password" placeholder="Ваш пароль"
                   name="password" type="password" minLength={5} maxLength={15} required onChange={handleInputChange}/>
          </label>
          <span className="register__input-error">{passwordError && errorText}</span>

          <span className="register__global-error">
            {isError && errorText}
          </span>

            <button className="register__btn register__btn_save register__btn_login" type="submit">
              Войти
            </button>
            <div className="register__bottom-container">
              <p className="register__bottom-container-text">Еще не зарегистрированы?</p>
              <Link className="register__btn register__btn_link" to="/register" >
                Регистрация
              </Link>
            </div>

        </form>
      </div>
    </section>
  );
};

export default Login;
