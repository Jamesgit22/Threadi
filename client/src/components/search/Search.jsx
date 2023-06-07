import React, { useState } from "react";
import axios from "axios";
import MovieResults from "../movieresults/MovieResults";
import "./Search.css";

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
        <input
          type="search"
          placeholder="Search Movie"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit">Search</button>
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
