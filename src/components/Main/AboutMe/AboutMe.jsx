import './AboutMe.css';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import studentPhoto from '../../../images/student.png';

function AboutMe() {
  return (
    <section className="student" id="student">
      <div className="student__container" >
        <SectionTitle >Студент</SectionTitle>
        <div className="student__content">
          <div className="student__about">
            <h3 className="student__subtitle">Виталий</h3>
            <p className="student__text-bold">Фронтенд-разработчик, 30 лет</p>
            <p className="student__text"> Я родился и живу в Саратове, закончил факультет экономики СГУ.
                У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className="student__link" href="https://github.com/sv-rubik" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="student__photo" src={studentPhoto} alt='Фотография студента' />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
