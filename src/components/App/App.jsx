// import React, {useEffect, useState} from 'react'
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
// const [currentUser, setCurrentUser] = useState({}) // context variable
const currentUser = {} // временная заглушка TODO
const isLoggedIn = true // временная заглушка TODO

// function handleUpdateUser (profileInputsData) {
//   api.sendUserData({name: profileInputsData.name, about: profileInputsData.about})
//     .then((res) => {
//       setCurrentUser(res)
//       closeAllPopups()
//     })
//     .catch((err) => {console.log("There is an error while updating profile:", err) })
// }

// <BrowserRouter> imported in index.js
function App() {
  return (
    <div className="App">
      {/* Пока проверяется токен, покажи мне прикольный лоудер, а не мелькай главную страницу */}
      {/*{isLoading ? (*/}
      {/*  <PageLoader />*/}
      {/*) : (*/}
        <CurrentUserContext.Provider value={ currentUser }> {/*  value to provide from App to below components */}
          {/*{headerPaths.includes(location.pathname) && (*/}
          {/*  <Header isLoggedIn={isLoggedIn} />*/}
          {/*)}*/}
          <Header isLoggedIn={isLoggedIn} />
          <Main />
          {/*<main>*/}
          {/*  <Routes>*/}
          {/*    <Route path="/" element={<Main />} />*/}

            {/*  <Route*/}
            {/*    path="/signup"*/}
            {/*    element={*/}
            {/*      <Register*/}
            {/*        onRegister={handleRegister}*/}
            {/*        isLoggedIn={isLoggedIn}*/}
            {/*        apiErrors={apiErrors}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}

            {/*  <Route*/}
            {/*    path="/signin"*/}
            {/*    element={*/}
            {/*      <Login*/}
            {/*        onLogin={handleLogin}*/}
            {/*        isLoggedIn={isLoggedIn}*/}
            {/*        apiErrors={apiErrors}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}

            {/*  <Route*/}
            {/*    path="/movies"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute*/}
            {/*        element={Movies}*/}
            {/*        isLoggedIn={isLoggedIn}*/}
            {/*        movies={movies}*/}
            {/*        savedMovies={savedMovies}*/}
            {/*        onLikeMovie={handleLikeMovie}*/}
            {/*        apiErrors={apiErrors}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}

            {/*  <Route*/}
            {/*    path="/saved-movies"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute*/}
            {/*        element={SavedMovies}*/}
            {/*        savedMovies={savedMovies}*/}
            {/*        onDeleteMovie={handleDeleteMovie}*/}
            {/*        isLoggedIn={isLoggedIn}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}

            {/*  <Route*/}
            {/*    path="/profile"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute*/}
            {/*        element={Profile}*/}
            {/*        isLoggedIn={isLoggedIn}*/}
            {/*        apiErrors={apiErrors}*/}
            {/*        isOK={isOK}*/}
            {/*        onSignOut={handleSignOut}*/}
            {/*        onUpdateUser={handleUpdateUser}*/}
            {/*      />*/}
            {/*    }*/}
            {/*  />*/}

            {/*  <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />*/}
            {/*</Routes>*/}
          {/*</main>*/}
          {/*{footerPaths.includes(location.pathname) && <Footer />}*/}
          <Footer />
        </CurrentUserContext.Provider>
      {/*)}*/}
    </div>
  );
}

export default App;
