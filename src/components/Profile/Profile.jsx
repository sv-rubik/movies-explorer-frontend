import './Profile.css';
import React, {useContext, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile({ handleLogOut }) {
  const currentUser = useContext(CurrentUserContext)
  const [showBtnSave, setShowBtnSave] = useState(false);
  const isError = true // TODO временная заглушка
  const errorText = "Текст какой-то ошибки" // TODO временная заглушка
  const handleBtnEditClick = () => {
    setShowBtnSave(true);
  };

  return (
    <section className="profile">
      <div className="profile__container" >
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="profile">
          <label className="profile__label">Имя
            <input className="profile__input" value={currentUser.name} placeholder="Имя" name="name" type="text"
                   minLength={2} maxLength={30} required onFocus={handleBtnEditClick}/>
          </label>
          <span className="profile__input-error">{isError && errorText}</span>
          <label className="profile__label">E-mail
            <input className="profile__input" value={currentUser.email} placeholder="Email" name="email"
                   type="email" required onFocus={handleBtnEditClick}/>
          </label>
          <span className="profile__input-error">{isError && errorText}</span>

          <span className="profile__global-error">
            {isError && errorText}
          </span>

          {showBtnSave && (
            <button className="profile__btn profile__btn_save" type="submit">
              Сохранить
            </button>
          )}

          {!showBtnSave && (
            <>
              <button className="profile__btn" type="button" onClick={handleBtnEditClick}>
                Редактировать
              </button>
              <button className="profile__btn profile__btn_exit" type="button" onClick={handleLogOut}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;
