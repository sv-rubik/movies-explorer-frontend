import './MoviesCardList.css';
import MovieCard from "./MoviesCard/MoviesCard";
import { movies } from "../../utils/movies";
import moviePic from '../../images/moviePic.png'; // Временная заглушка TODO movie.link
import Preloader from '../Preloader/Preloader';

function MoviesCardList({isLoading}) {

  const generateMoviesList = () => {
    return movies.map((movie) => {
      return (
        <MovieCard name={movie.nameRU} duration={movie.duration} link={moviePic} trailerLink={movie.trailerLink} />
      );
    });
  };

  return (
    <section className="movies">
      <div className="movies__container">
        <ul className='movies__list'>
          {isLoading
            ? <Preloader />
            : generateMoviesList()}
        </ul>
        <div className='movies__btn-container'>
          <button className="movies__btn-add" type='button'>
            Ещё
          </button>
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
