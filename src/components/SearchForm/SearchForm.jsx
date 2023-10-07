import './SearchForm.css';
import find from '../../images/find.svg';
import Checkbox from "./Checkbox/Checkbox";

function SearchForm() {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={ handleSearchSubmit }>
        <div className="search__input-container">
          <input className="search__input" placeholder="Фильм" name="search"/>
        </div>

        <button className="search__btn" type="submit" >
          <img src={find} alt="Иконка поиска" />
        </button>
        <div className="search__checkbox-container">
          <Checkbox />
          <p className="search__shorts">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
