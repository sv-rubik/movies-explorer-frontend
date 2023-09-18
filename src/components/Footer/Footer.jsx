import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2023</p>
        <nav aria-label="ссылки на дополнительные ресурсы">
          <ul className="footer__links">
            <li>
              <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
