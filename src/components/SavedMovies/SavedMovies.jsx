import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({isLoading}) {

  return (
    <>
      <SearchForm />
      <MoviesCardList isLoading={isLoading}/>
    </>
  );
};

export default SavedMovies;
