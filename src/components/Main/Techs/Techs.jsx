import './Techs.css';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container" >
        <SectionTitle>Технологии</SectionTitle>

          <div className="techs__content">
            <h3 className='techs__subtitle'>7 технологий</h3>
            <p className='techs__text'>
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>

            <ul className="techs__list">
              <li className='techs__link'>HTML</li>
              <li className='techs__link'>CSS</li>
              <li className='techs__link'>JS</li>
              <li className='techs__link'>React</li>
              <li className='techs__link'>Git</li>
              <li className='techs__link'>Express.js</li>
              <li className='techs__link'>mongoDB</li>
            </ul>
          </div>
      </div>
    </section>
  );
};

export default Techs;
