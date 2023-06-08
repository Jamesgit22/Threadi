import React, { useState } from "react";
import axios from "axios";
import MovieResults from "../movieresults/MovieResults";
import "./Search.css";
import {motion} from 'framer-motion';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://www.omdbapi.com/?apikey=be77788b&s=${searchInput}`)
      .then((res) => {
        console.log(res.data);
        setMovies(res.data.Search || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>  
        <motion.input
          initial={{width: '0%'}}
          whileInView={{width: '70%'}}
          transition={{duration: 0.8}}
          id="search-input"
          type="search"
          placeholder="Search Movie"
          onChange={handleChange}
          value={searchInput}
        />
        <button id="search-submit" type="submit">Search</button>
      </form>
      {movies.length > 0 && (
        <div className="movie-results-dropdown">
          {movies.map((movie) => (
            <MovieResults key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
