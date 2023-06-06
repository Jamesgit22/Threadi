import React, { useState } from "react";
import axios from "axios";
import MovieResults from "../movieresults/MovieResults"; // Import the MovieResults component

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://www.omdbapi.com/?apikey=be77788b&s=${searchInput}`)
      .then((res) => {
        setMovies(res.data.Search || []); // Assuming the API response contains a 'Search' property
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search Movie"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie-results">
        {movies.map((movie) => (
          <MovieResults key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
