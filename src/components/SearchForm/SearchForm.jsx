import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import find from '../../images/find.svg';
import Checkbox from "./Checkbox/Checkbox";

function SearchForm({ searchQuery, onFilter }) {
  const [searchString, setSearchString] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(searchQuery.isCheckboxChecked || false);
  const [isEmptyQuery, setIsEmptyQuery] = useState('');
  const inputPlaceholder = isEmptyQuery ? 'Нужно ввести ключевое слово' : 'Фильм';

  useEffect(() => {
    // Восстановление данных из локального хранилища при первой загрузке компонента
    if (searchQuery.searchString) {
      setSearchString(searchQuery.searchString);
    }
    // отмечен ли чекбокс ранее?
    setIsCheckboxChecked(searchQuery.isCheckboxChecked || false);
  }, [searchQuery]);

  const handleSearchInput = (e) => { setSearchString(e.target.value) };

  const changeCheckboxState = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    onFilter({
      searchString: searchString || searchQuery.searchString || '',
      isCheckboxChecked: !isCheckboxChecked
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    !searchString
      ? setIsEmptyQuery('Нужно ввести ключевое слово')
      : onFilter({ searchString, isCheckboxChecked });
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={ handleSearchSubmit }>
        <div className="search__input-container">
          <input className="search__input" placeholder={inputPlaceholder} name="search" onChange={ handleSearchInput }
                 value={searchString || ''} min={1}/>
        </div>

        <button className="search__btn" type="submit" >
          <img src={find} alt="Иконка поиска" />
        </button>

        <div className="search__checkbox-container">
          <Checkbox isChecked={isCheckboxChecked} onCheck={changeCheckboxState} />
          <p className="search__shorts">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
