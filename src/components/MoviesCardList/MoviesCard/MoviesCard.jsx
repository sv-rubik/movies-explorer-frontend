import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import {convertor} from "../../../utils/convertor";

function MoviesCard({name, duration, link, trailerLink, onLike, onDelete, currentMovie, savedMovies}) {
  const location = useLocation();
  const isLiked = savedMovies ? savedMovies.find((item) => item.movieId === currentMovie.id) : false;

  return (
    <li className="element" >
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="element__image" src={link} alt={name} />
      </a>

      <div className="element__description">
        <div className="element__description-container">
          <h2 className="element__title">{name}</h2>
          <p className="element__duration">{convertor(duration)}</p>
        </div>

        <div className="element__likes">
          {location.pathname === '/saved-movies' && (
            <button className="element__trash" type="button" aria-label="удалить фильм из избранного"
                    onClick={() => onDelete(currentMovie._id)}/>
          )}
          {location.pathname === '/movies' && (
            <button className={ `element__like ${ isLiked ? 'element__like_active' : '' }` } type="button"
                    aria-label="добавить фильм в избранное" onClick={() => onLike(currentMovie)}></button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MoviesCard;
