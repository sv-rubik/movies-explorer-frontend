import './App.css';
import React, {useState, useEffect} from 'react'
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ErrorPage from "../ErrorPage/ErrorPage";
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { WindowSizeProvider } from "../../contexts/WindowSizeContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import {moviesApi} from '../../utils/moviesApi'
import {mainApi} from '../../utils/mainApi'
import {authApi} from '../../utils/authApi'
import {beatfilmMoviesApiURL} from "../../utils/constants";

// <BrowserRouter> imported in index.js
function App() {
  const location = useLocation(); // Получаем текущий маршрут
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  // Если JWT в куках, то при загрузке приложения (при монтировании App) делать запрос на /me, например.
  // Пока запрос не завершится отображать лоадер вместо всего приложения (то есть до отображения роутов).
  // Если запрос успешный, показать приложение, если нет, тоже показать, но тогда будет переход на страницу входа
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // если без !!, то вернет null
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([]);
  const [serverError, setServerError] = useState('');
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  // Existing token check to render correct path for earlier authorized user
  useEffect(() => {
    const existingToken = localStorage.getItem('token') // check if any tokens available in localstorage
    if (existingToken) {
      authApi.checkToken(existingToken) //if jwt valid get response User obj with '_id' (jwt token) & 'email'
        .then(() => {
          setIsLoggedIn(true);     // redirect to content
        })
        .catch((err) => {console.log(`There is an error in token verification, ${err}`)})
    }
  }, [isLoggedIn, navigate])

  // To render initial movies and user data from server
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserData(), moviesApi.getInitialMovies(), mainApi.getSavedMovies()])
        .then(([userData, movies, savedMovies]) => {
          setCurrentUser(userData)
          setMovies(movies)
          setSavedMovies(savedMovies.filter((movie) => movie.owner === userData._id));
        })
        .catch((err) => {
          console.log(`There is an error:`, err);
          setServerError(`Во время запроса произошла ошибка. Возможно, проблема с соединением или 
            сервер недоступен. Подождите немного и попробуйте ещё раз: ${err}`);
        })
    }
  }, [isLoggedIn])

  /////// Authorization
  function handleRegister (formValues) {
    authApi.register(formValues.name, formValues.email, formValues.password)
      .then((res) => {
        handleLogin(formValues.email, formValues.password)
      })
      .catch((err) => {
        console.log(`There is an error while registering, ${err}`);
        // ошибку сервера в компонент Register
        setServerError(`При регистрации произошла ошибка: ${err}`);
      })
  }

  function handleLogin (email, password) {
    authApi.authorize(email, password)
      .then((res) => {
        // received res object, which contains 'token'
        if (res.token) {
          localStorage.setItem('token', res.token) // save token in localstorage
          setIsLoggedIn(true)
          navigate('/movies')
        }
      })
      .catch((err) => {
        console.log(`There is an error while logging in, ${err}`);
        setServerError(`При логине произошла ошибка: ${err}`);
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setSavedMovies([])
    setIsDataUpdated(false);
    navigate("/");

  };

  const handleProfileChange = (profileInputsData) => {
    mainApi.sendUserData(
      {
        name: profileInputsData.name,
        email: profileInputsData.email,
      })
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
        setIsDataUpdated(true);
      })
      .catch((err) => {
        console.log("There is an error while updating profile:", err);
        setServerError(`При изменении профиля произошла ошибка: ${err}`);
        setIsDataUpdated(false);
      })
  }

  //////// Movies actions
  const handleMovieLike = (movie) => {
    const currentMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: beatfilmMoviesApiURL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: beatfilmMoviesApiURL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    // Проверяем, есть ли фильм в savedMovies
    const isMovieInSavedMovies = savedMovies.find((savedMovie) => savedMovie.movieId === currentMovie.movieId);
    if (isMovieInSavedMovies) {
      // Если фильм уже есть в savedMovies, вызываем функцию удаления
      handleDeleteMovie(isMovieInSavedMovies._id);
    } else {
      // Иначе, добавляем фильм в savedMovies
      mainApi.saveMovie(currentMovie)
        .then((savedMovie) => {
          setSavedMovies((movies) => [...movies, savedMovie])
        })
        .catch((err) => {
          console.log("There is an error while saving movie to favourites:", err);
        });
    }
  };

  // возвращаем в savedMovies новый массив фильмов, исключая фильм с _id, который равен movieId.
  const handleDeleteMovie = (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((movies) => movies.filter((movie) => movie._id !== movieId))
      })
      .catch((err) => {console.log("There is an error while deleting movie from favourites:", err) });
  };

  //////////////////////
  const resetServerErrors = () => {
    setServerError('')
  };

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

  const appClassName = ['App'];
  if (['/profile', '/signup', '/signin'].includes(location.pathname)) {appClassName.push('App_color-white')}

  return (
    <div className={appClassName.join(' ')}>
        <CurrentUserContext.Provider value={ currentUser }> {/*  value to provide from App to below components */}
          <WindowSizeProvider>
            {shouldShowHeaderFooter() && shouldShowHeader() && <Header isLoggedIn={isLoggedIn} />}
            <main className="main">
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies" element={
                    <ProtectedRoute
                      element={Movies}
                      movies={movies}
                      savedMovies={savedMovies}
                      onLike={handleMovieLike}
                      serverError={serverError}
                      isLoggedIn={isLoggedIn} // necessary for ProtectedRoute
                    />}
                  />
                  <Route path="/saved-movies" element={
                    <ProtectedRoute
                      element={SavedMovies}
                      savedMovies={savedMovies}
                      onDelete={handleDeleteMovie}
                      serverError={serverError}
                      isLoggedIn={isLoggedIn}
                    />}
                  />
                  <Route path="/profile" element={
                    <ProtectedRoute
                      element={Profile}
                      handleLogOut={handleLogout}
                      onUpdateUser={handleProfileChange}
                      serverError={serverError}
                      resetServerErrors={resetServerErrors}
                      isDataUpdated={isDataUpdated}
                      isLoggedIn={isLoggedIn}
                    />}
                  />
                  {!isLoggedIn && (
                    <Route path="/signin" element={<Login onLogin={handleLogin} serverError={serverError}
                          resetServerErrors={resetServerErrors} />} />
                  )}
                  {!isLoggedIn && (
                    <Route path="/signup" element={<Register onRegister={handleRegister} serverError={serverError}
                          resetServerErrors={resetServerErrors} isLoggedIn={isLoggedIn} />} />
                  )}
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
