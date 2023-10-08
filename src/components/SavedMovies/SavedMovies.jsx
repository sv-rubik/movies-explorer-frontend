import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from "react";

function SavedMovies({ savedMovies, onDelete }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState({});
  const [isMoviesFound, setIsMoviesFound] = useState(true);

  const findMovies = (queryObject) => {
    setIsLoading(true);
    localStorage.setItem('searchQueryForSavedMoviesPage', JSON.stringify(queryObject));
    let filteredQuery = savedMovies;
    if (queryObject.searchString) {
      const searchStringLower = queryObject.searchString.toLowerCase();
      filteredQuery = savedMovies.filter((movie) => {
        const nameRULower = movie.nameRU ? movie.nameRU.toLowerCase() : '';
        const nameENLower = movie.nameEN ? movie.nameEN.toLowerCase() : '';
        return (
          nameRULower.includes(searchStringLower) || nameENLower.includes(searchStringLower)
        );
      });
    }
    if (queryObject.isCheckboxChecked) {
      filteredQuery = filteredQuery.filter((movie) => {
        return movie.duration <= 40;
      });
    }
    setFilteredMovies(filteredQuery);
    filteredQuery.length > 0 ? setIsMoviesFound(true) : setIsMoviesFound(false)
    localStorage.setItem('searchQueryForSavedMoviesPageFiltered', JSON.stringify(filteredQuery));
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    const searchedMovies = localStorage.getItem('searchQueryForSavedMoviesPageFiltered');
    const queries = localStorage.getItem('searchQueryForSavedMoviesPage');

    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }

    if (queries) {
      setSearchString(JSON.parse(queries));
    } else {
      setSearchString({ searchString: '', isCheckboxChecked: false });
    }
  }, [savedMovies]);

  useEffect(() => {
    findMovies(searchString);
  }, [onDelete, searchString]);

  return (
    <>
      <SearchForm searchQuery={searchString} onFilter={findMovies} />
      <MoviesCardList isLoading={isLoading} movies={filteredMovies} onDelete={onDelete} isMoviesFound={isMoviesFound}/>
    </>
  );
}

export default SavedMovies;
