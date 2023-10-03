import './Register.css';
import React, {useContext, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

function Register() {
  const currentUser = useContext(CurrentUserContext)
  const isError = true // TODO временная заглушка
  // TODO временная заглушка для валидации
  const [errorText, setErrorText] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleInputChange = (e) =>  {
    const input = e.target;
    if (!input.checkValidity()) {
      if (input.name === 'name') {
        setNameError(input.validationMessage);
        setErrorText(input.validationMessage);
      } else if (input.name === 'email') {
        setEmailError(input.validationMessage);
        setErrorText(input.validationMessage);
      } else if (input.name === 'password') {
        setPasswordError(input.validationMessage);
        setErrorText(input.validationMessage);
      }
    } else {
      if (input.name === 'name') {
        setNameError('');
        setErrorText('');
      } else if (input.name === 'email') {
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
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" name="profile">
          <label className="register__label">Имя
            <input className="register__input" placeholder="Ваше имя" name="name" type="text"
                   minLength={2} maxLength={30} required onChange={handleInputChange}/>
          </label>
          <span className="register__input-error">{isError && nameError}</span>
          <label className="register__label">E-mail
            <input className="register__input" placeholder={currentUser.email} name="email" type="email" required
                   onChange={handleInputChange}/>
          </label>
          <span className="register__input-error">{isError && emailError}</span>
          <label className="register__label">Пароль
            <input className="register__input register__input_password" placeholder="Ваш пароль"
                   name="password" type="password" minLength={5} maxLength={15} required onChange={handleInputChange}/>
          </label>
          <span className="register__input-error">{isError && passwordError}</span>

          <span className="register__global-error">
            {isError && errorText}
          </span>

            <button className="register__btn register__btn_save" type="submit">
              Зарегистрироваться
            </button>
            <div className="register__bottom-container">
              <p className="register__bottom-container-text">Уже зарегистрированы?</p>
              <Link className="register__btn register__btn_link" to="/login" >
                Войти
              </Link>
            </div>

        </form>
      </div>
    </section>
  );
};

export default Register;
