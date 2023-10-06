import './MoviesCardList.css';
import MoviesCard from "./MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';
import {beatfilmMoviesApiURL} from "../../utils/constants";

function MoviesCardList({movies, isLoading, onLike, onDelete, savedMovies}) {

  const movieImageURL = (movie) => movie.movieId ? movie.image : beatfilmMoviesApiURL + movie.image.url

  const generateMoviesList = () => {
    return movies.map((movie) => {
      return (
        <MoviesCard currentMovie={movie}
                    name={movie.nameRU}
                    duration={movie.duration}
                    link={movieImageURL(movie)}
                    trailerLink={movie.trailerLink}
                    key={movie.id || movie.movieId}
                    onLike={onLike}
                    onDelete={onDelete}
                    savedMovies={savedMovies}
        />
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
