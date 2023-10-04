import './Portfolio.css';
import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container" >
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className="portfolio__list">

            <li className="portfolio__list-item">
              <a className='portfolio__link' href="https://sv-rubik.github.io/react-mesto-auth/" target="_blank"
                 rel="noreferrer">
                Статичный сайт
                <span className='portfolio__arrow'>↗</span>
              </a>
            </li>

          <li className="portfolio__list-item">
            <a className='portfolio__link' href="https://sv-rubik.github.io/react-mesto-auth/" target="_blank"
               rel="noreferrer">
              Адаптивный сайт
              <span className='portfolio__arrow'>↗</span>
            </a>
          </li>

          <li className="portfolio__list-item">
            <a className='portfolio__link' href="https://sv-rubik.github.io/react-mesto-auth/" target="_blank"
               rel="noreferrer">
              Одностраничное приложение
              <span className='portfolio__arrow'>↗</span>
            </a>
          </li>

        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
