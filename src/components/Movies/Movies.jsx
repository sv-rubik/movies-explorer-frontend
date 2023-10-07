import './Movies.css';
import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, isLoading, onLike, savedMovies }) {
  // Найденные поиском фильмы будут показаны в MoviesCardList на странице movies
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  return (
    <>
      <SearchForm movies={movies} />
      <MoviesCardList isLoading={isLoading} movies={movies} onLike={onLike} savedMovies={savedMovies}/>
    </>
  );
};

export default Movies;
