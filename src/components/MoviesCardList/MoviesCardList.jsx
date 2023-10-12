import './MoviesCardList.css';
import { useState, useEffect, useCallback } from "react";
import {useLocation} from "react-router-dom";
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {beatfilmMoviesApiURL} from '../../utils/constants';
import { useWindowSize } from "../../contexts/WindowSizeContext";

function MoviesCardList({movies, isLoading, onLike, onDelete, savedMovies, isMoviesFound, serverError}) {
  const location = useLocation();
  const movieImageURL = (movie) => movie.movieId ? movie.image : beatfilmMoviesApiURL + movie.image.url
  const { isDesktop, isTablet, isMiddleSize } = useWindowSize();

  // useCallback, чтобы убрать предупреждение eslint. Ф-я не будет создаваться каждый раз при рендеринге.
  const getVisibleMoviesCount = useCallback(() => {
    if (isDesktop) {
      return 16; // При широком экране отображаем 16 шт
    } else if (isMiddleSize) {
      return 12; // При экране вне макета диплома отображаем 12 шт
    } else if (isTablet) {
      return 8; // При среднем экране отображаем 8 шт
    } else {
      return 5; // При узком экране отображаем 5 шт
    }
  }, [isDesktop, isTablet, isMiddleSize]);
  const [numberOfMovies, setNumberOfMovies] = useState(getVisibleMoviesCount);

  // Сброс кол-ва отображаемых карточек при новом поиске (изменении пропса movies) для страницы movies
  // и слежение за изменением размера окна и => изменения кол-ва отображаемых фильмов
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      // Показать все фильмы, если это страница saved-movies
      setNumberOfMovies(movies.length);
    } else {
      // Иначе, показать фильмы в зависимости от разрешения экрана
      setNumberOfMovies(getVisibleMoviesCount());
    }
  }, [isDesktop, isTablet, isMiddleSize, getVisibleMoviesCount, movies, location.pathname]);

  // Для кнопки Еще
  const handleShowMore = () => {
    const showAnotherMoviesRow = () => {
      if (isDesktop) {
        return 4; // При широком экране добавляем 4 карточки
      } else if(isMiddleSize) {
        return 3; // При экране вне макета диплома добавляем 3 карточки
      } else {
        return 2; // При узком экране добавляем 2 карточки
      }
    };
    setNumberOfMovies((prevVisibleMovies) => prevVisibleMovies + showAnotherMoviesRow());
  }

  const generateMoviesList = (numberOfMovies) => {
    const limitedMovies = movies.slice(0, numberOfMovies);

    return limitedMovies.map((movie) => {
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
            ? (<Preloader />)
            : (isMoviesFound)
              ? (generateMoviesList(numberOfMovies))
              : (serverError)
                ? (<p className="movies__list-text">{serverError}</p>)
                : (<p className="movies__list-text">По вашему запросу ничего не найдено. Попробуйте еще раз.</p>)}
        </ul>
        <div className='movies__btn-container'>
          {
            numberOfMovies < movies.length && (location.pathname === '/movies') && (
              <button className="movies__btn-add" type='button' onClick={handleShowMore}>
                Ещё
              </button>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default MoviesCardList;
