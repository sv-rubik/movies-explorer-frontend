import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isLoading, savedMovies, onDelete }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} movies={savedMovies} onDelete={onDelete}/>
    </>
  );
};

export default SavedMovies;
