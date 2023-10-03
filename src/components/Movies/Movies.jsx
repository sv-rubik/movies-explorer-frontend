import './Movies.css';
import {useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({isLoading}) {

  return (
    <>
      <SearchForm />
      <MoviesCardList isLoading={isLoading}/>
    </>
  );
};

export default Movies;
