import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({name, duration, link, trailerLink}) {
  const location = useLocation();
  const isLiked = true; // TODO временная заглушка

  return (
    <li className="element" >
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="element__image" src={link} alt={name} />
      </a>

      <div className="element__description">
        <div>
          <h2 className="element__title">{name}</h2>
          <p className="element__duration">{duration}</p>
        </div>

        <div className="element__likes">
          {location.pathname === '/saved-movies' && (
            <button className="element__trash" type="button" aria-label="удалить фильм из избранного"/>
          )}
          {location.pathname === '/movies' && (
            <button className={ `element__like ${ isLiked ? 'element__like_active' : '' }` } type="button"
                    aria-label="поставить лайк"></button>
          )}
        </div>
      </div>
    </li>
  )
};

export default MoviesCard;
