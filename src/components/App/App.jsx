import './App.css';
import React, {useState} from 'react'
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import ErrorPage from "../ErrorPage/ErrorPage";
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { WindowSizeProvider } from "../../contexts/WindowSizeContext";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

// <BrowserRouter> imported in index.js
function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO временная заглушка
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Получаем текущий маршрут
  const navigate = useNavigate();

// TODO временный прелоадер
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const shouldShowFooter = () => {
    // Если текущий маршрут равен profile, register, login, то не показываем Footer
    return !['/profile', '/signup', '/signin'].includes(location.pathname);
  };

  const shouldShowHeader = () => {
    // Если текущий маршрут равен register, login, то не показываем Header
    return !['/signup', '/signin'].includes(location.pathname);
  };

  const shouldShowHeaderFooter = () => {
    // Если текущий маршрут равен ErrorPage, то не показываем Header и Footer
    return location.pathname !== '/error';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="App">
        <CurrentUserContext.Provider value={ currentUser }> {/*  value to provide from App to below components */}
          <WindowSizeProvider>
            {shouldShowHeaderFooter() && shouldShowHeader() && <Header isLoggedIn={isLoggedIn} />}
            <main className="main">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movies" element={<Movies isLoading={isLoading}/>} />
                <Route path="/saved-movies" element={<SavedMovies isLoading={isLoading}/>} />
                <Route path="/profile" element={<Profile handleLogOut={handleLogout}/>} />
                <Route path="/signin" element={<Login />} /> {/*login*/}
                <Route path="/signup" element={<Register />} /> {/*register*/}
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<Navigate replace to="/error" />} />
              </Routes>
            </main>
            {shouldShowHeaderFooter() && shouldShowFooter() && <Footer />}
          </WindowSizeProvider>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
