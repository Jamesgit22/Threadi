import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [moviePosters, setMoviePosters] = useState([]);

  useEffect(() => {
    // Fetch popular movies from Movie Database API
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=7841b2501ec16e70277379264ca7ae51",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODQxYjI1MDFlYzE2ZTcwMjc3Mzc5MjY0Y2E3YWU1MSIsInN1YiI6IjY0N2ZlNjkwZDJiMjA5MDBjYTFjOTAyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ytr-twdzRINrY5Loanr3YDvEETjSzmhhE1EydsI7oK4",
            },
          }
        );
        const data = await response.json();
        setMoviePosters(data.results.slice(0, 3)); // Retrieve only the first 3 movies
      } catch (error) {
        console.log("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="home-container">
      <div className="top">
        <h1>Rate all the entertainment you watch</h1>
        <button>Sign Up</button>
        {moviePosters.length > 0 && (
          <div className="movie-poster">
            <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${moviePosters[0].poster_path}`} alt={moviePosters[0].title} />
          </div>
        )}
      </div>
      <div className="middle">
        <h1>Share what you watch with your friends</h1>
        <button>Sign Up</button>
        {moviePosters.length > 1 && (
          <div className="movie-poster">
            <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${moviePosters[1].poster_path}`} alt={moviePosters[1].title} />
          </div>
        )}
      </div>
      <div className="bottom">
        <h1>See what your friends rated</h1>
        <button>Sign Up</button>
        {moviePosters.length > 2 && (
          <div className="movie-poster">
            <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${moviePosters[2].poster_path}`} alt={moviePosters[2].title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
