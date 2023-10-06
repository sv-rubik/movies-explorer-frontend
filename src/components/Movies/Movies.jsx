import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, isLoading, onLike, savedMovies }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} movies={movies} onLike={onLike} savedMovies={savedMovies}/>
    </>
  );
};

export default Movies;
