import React, { useEffect, useState } from "react";
import SignUpModal from "../signupmodal/Signupmodal";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Home = () => {
  const [moviePosters, setMoviePosters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
            },
          }
        )
        .then((res) => {
          setMoviePosters(res.data.results.slice(0, 3));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPopularMovies();
  }, []);

  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <div className="top">
        <div className="subtitleOne">
          <h1 className="firstHeader">
            <span className="red-text">Rate</span> all the entertainment you
            watch
          </h1>
          <button className="firstButton" onClick={openModal}>
            Start Rating Now
          </button>
        </div>
        {moviePosters.length > 0 && (
          <img
            className="movie-img1"
            src={`https://image.tmdb.org/t/p/w500/${moviePosters[0].poster_path}`}
            alt={moviePosters[0].title}
          />
        )}
      </div>
      <div className="middle">
        {moviePosters.length > 1 && (
          <img
            className="movie-img2"
            src={`https://image.tmdb.org/t/p/w500/${moviePosters[1].poster_path}`}
            alt={moviePosters[1].title}
          />
        )}
        <div className="subtitleTwo">
          <h1 className="secondHeader">
            <span className="red-text">Share </span>what you watch with your
            friends
          </h1>
          <button className="secondButton" onClick={openModal}>
            Start Sharing Now
          </button>
        </div>
      </div>
      <div className="bottom">
        <div className="subtitleThree">
          <h1 className="thirdHeader">
            <span className="red-text">See </span>what your friends rated
          </h1>
          <button className="thirdButton" onClick={openModal}>
            Sign Up Now
          </button>
        </div>
        {moviePosters.length > 2 && (
          <img
            className="movie-img3"
            src={`https://image.tmdb.org/t/p/w500/${moviePosters[2].poster_path}`}
            alt={moviePosters[2].title}
          />
        )}
      </div>
      {isModalOpen && <SignUpModal closeModal={closeModal} />}
      <div className="howSection">
        <div className="howSectionTitle">How Threadi Works</div>
        <div className="howSectionContainer">
          <div className="howsignUpContainer">
            <FontAwesomeIcon
              icon={faLaptop}
              className="computerSymbol"
              size="2xl"
              style={{ color: "#ffffff" }}
            />
            <div className="howsignUpText">Sign Up for Free</div>
          </div>
          <div className="howsignUpContainer">
            <FontAwesomeIcon
              icon={faFilm}
              className="computerSymbol"
              size="2xl"
              style={{ color: "#ffffff" }}
            />
            <div className="howsignUpText">Review your Entertainment</div>
          </div>
          <div className="howsignUpContainer">
            <FontAwesomeIcon
              icon={faPerson}
              className="computerSymbol"
              size="2xl"
              style={{ color: "#ffffff" }}
            />
            <div className="howsignUpText">Share with your Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
