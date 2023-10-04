import './PromoLinks.css';
import React from 'react';

function PromoLinks() {
  return (
    <nav className='promo-links'>
      <ul className='promo-links__list'>
        <li>
          <a className='promo-links__link' href="#about-project">О проекте</a>
        </li>
        <li>
          <a className='promo-links__link' href="#techs">Технологии</a>
        </li>
        <li>
          <a className='promo-links__link' href="#student">Студент</a>
        </li>
      </ul>
    </nav>
  )};

export default PromoLinks;
