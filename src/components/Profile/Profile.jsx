import './Profile.css';
import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile({ handleLogOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showBtnSave, setShowBtnSave] = useState(false);

  // After currentUser is loaded, will be used in input value
  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser])

  const isError = true // TODO временная заглушка
  const errorText = "Текст какой-то ошибки" // TODO временная заглушка
  const handleBtnEditClick = () => {
    setShowBtnSave(true);
  };

  function handleName(e) {setName(e.target.value)}
  function handleEmail(e) {setEmail(e.target.value)}
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({ name: name, email: email })
  }

  return (
    <section className="profile">
      <div className="profile__container" >
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="profile" onSubmit={handleSubmit} >
          <label className="profile__label">Имя
            <input className="profile__input" value={name || ''} placeholder="Имя" name="name" type="text"
                   minLength={2} maxLength={30} required onFocus={handleBtnEditClick} onChange={handleName}/>
          </label>
          <span className="profile__input-error">{isError && errorText}</span>
          <label className="profile__label">E-mail
            <input className="profile__input" value={email || ''} placeholder="Email" name="email"
                   type="email" required onFocus={handleBtnEditClick} onChange={handleEmail}/>
          </label>
          <span className="profile__input-error">{isError && errorText}</span>

          <span className="profile__global-error">
            {isError && errorText}
          </span>

          {showBtnSave && (
            <button className="profile__btn profile__btn_save" type="submit" disabled={isError}>
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
