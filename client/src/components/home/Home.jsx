import React, { useEffect, useState } from "react";
import SignUpModal from "../signupmodal/Signupmodal";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [moviePosters, setMoviePosters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('/api/third-party/popularMovies')
      .then((res) => {
        setMoviePosters(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h1 className="firstHeader">Rate all the entertainment you watch</h1>
          <button className="firstButton" onClick={openModal}>
            Sign Up
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
            Share what you watch with your friends
          </h1>
          <button className="secondButton" onClick={openModal}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="bottom">
        <div className="subtitleThree">
          <h1 className="thirdHeader">See what your friends rated</h1>
          <button className="thirdButton" onClick={openModal}>
            Sign Up
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
