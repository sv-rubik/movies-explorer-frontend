import './AboutProject.css';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container" >
        <SectionTitle >О проекте</SectionTitle>
        <ul className="about-project__list">
          <li className="about-project__list-item">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__list-item">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className='about-project__duration'>
          <p className='about-project__duration-line about-project__duration-line_progress'>1 неделя</p>
          <p className='about-project__duration-line'>4 недели</p>
          <p className='about-project__duration-name'>Back-end</p>
          <p className='about-project__duration-name'>Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
