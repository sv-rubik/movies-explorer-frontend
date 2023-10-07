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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // TODO
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([]);

  // TODO временный прелоадер
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  // Existing token check to render correct path for earlier authorized user
  useEffect(() => {
    const existingToken = localStorage.getItem('token') // check if any tokens available in localstorage
    if (existingToken) {
      authApi.checkToken(existingToken) //if jwt valid get response User obj with '_id' (jwt token) & 'email'
        .then(() => {
          setIsLoggedIn(true)      // redirect to content
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
        .catch(err => console.log("There is an error me:", err))
    }
  }, [isLoggedIn])

  /////// Authorization
  function handleRegister (name, email, password) {
    authApi.register(name, email, password)
      .then(() => {
        navigate('/signin')
      })
      .catch((err) => {
        console.log(`There is an error while registering, ${err}`)
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
        console.log(`There is an error while logging in, ${err}`)
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    // localStorage.clear();
    setIsLoggedIn(false);
    // setCurrentUser({})
    setSavedMovies([])
    navigate("/");

  };

  const handleProfileChange = (profileInputsData) => {
    mainApi.sendUserData(
      {
        name: profileInputsData.name,
        email: profileInputsData.email,
      })
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer)
      })
      .catch((err) => {console.log("There is an error while updating profile:", err) })
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
      } )
      .catch((err) => {console.log("There is an error while deleting movie from favourites:", err) });
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

  return (
    <div className="App">
        <CurrentUserContext.Provider value={ currentUser }> {/*  value to provide from App to below components */}
          <WindowSizeProvider>
            {shouldShowHeaderFooter() && shouldShowHeader() && <Header isLoggedIn={isLoggedIn} />}
            <main className="main">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movies" element={
                  <ProtectedRoute
                  element={Movies}
                  isLoading={isLoading}
                  movies={movies}
                  savedMovies={savedMovies}
                  onLike={handleMovieLike}
                  isLoggedIn={isLoggedIn} // necessary for ProtectedRoute
                  />}
                />
                <Route path="/saved-movies" element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoading={isLoading}
                    savedMovies={savedMovies}
                    onDelete={handleDeleteMovie}
                    isLoggedIn={isLoggedIn}
                  />}
                />
                <Route path="/profile" element={
                  <ProtectedRoute
                    element={Profile}
                    handleLogOut={handleLogout}
                    onUpdateUser={handleProfileChange}
                    isLoggedIn={isLoggedIn}
                  />}
                />
                <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
                <Route path="/signup" element={<Register onRegister={handleRegister} />} />
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
