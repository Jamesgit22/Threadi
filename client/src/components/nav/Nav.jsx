import React from "react";
import { useState, useEffect } from "react";
import "./Nav.css";
import Search from "../search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SignupModal from "../signupmodal/Signupmodal";
import { useHistory } from "react-router-dom";
import Auth from '../../utils/auth';

// resolve conflicts.
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isShown, setIsShown] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 821) {
        setIsMobile(!isMobile);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const toggleSearch = () => {
    setIsSearch((open) => !open);
    setIsShown(!isShown);
  };

  const handleSignupClick = () => {
    setShowModal(true);
  };

  const handleSignInClick = () => {
    window.location.href = `/login`;
  };

  const handleHomeClick = () => {
    window.location.href = `/`;
  };

  const handleBrowseClick = () => {
    window.location.href = `/browse`;
  };

  

const handleProfileClick = () => {
  if (Auth.loggedIn()) {
    const username = Auth.getProfile().data.username;
    window.location.href = `/profile/${username}`;
  } else {
    // Redirect to the login page or show an error message
    window.location.href = '/login';
  }
};


const handleSocialClick = () => {
  if (Auth.loggedIn()) {
    const username = Auth.getProfile().data.username;
    window.location.href = `/threadspage`;
  } else {
    // Redirect to the login page or show an error message
    window.location.href = '/login';
  }
};

  return (
    <>
      {isMobile ? (
        <div className="header container-fluid">
          <div className="row">
            <nav
              id="mobile-nav-container"
              className="col-12 d-flex justify-content-between"
            >
              <div id="logo-container" className="col-6 d-flex">
                <a href="/" onClick={handleHomeClick}>
                <h2 id="mobile-nav-logo" className="light-txt ">
                  THREADI
                </h2>
                </a>
              </div>
              <div className="mobile">
                <div id="nav-links" className="col-6">
                  <div id="hamburger-icon" onClick={() => toggleMenu()}>
                    <div className={`bar1 bars ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar2 bars ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar3 bars ${isOpen ? "open" : ""}`}></div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    id="mobile-menu"
                    className={`${isOpen ? "open" : ""}`}
                  >
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Projects');
                        toggleMenu();
                      }}
                    >
                      My Lists
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('About');
                        toggleMenu();
                      }}
                    >
                      Friends
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Contact');
                        toggleMenu();
                      }}
                    >
                      Following
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1 }}
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Home');
                        toggleMenu();
                      }}
                    >
                      Logout
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      ) : (
        <div className="header container-fluid">
          <div className="row">
            <nav id="nav-container" className="col-12">
              <div id="logo-container" className="col-3 d-flex">
                <div className="col-12 d-flex align-items-center">
                  <a href="/">
                  <h2 id="nav-logo" className="light-txt">
                    THREADI
                  </h2>
                  </a>
                  <img
                    id="nav-img-logo"
                    src="/images/threadLogo.png"
                    alt="broken"
                  />
                </div>
              </div>
              <div className="desktop col-6 d-flex">
                <div className="desktopNav col-12 d-flex align-items-center justify-content-center">
                  {isShown ? (
                    <>
                      <button className="desktop-nav-btns"
                      onClick={handleSocialClick}
                      >Social</button>
                      <button className="desktop-nav-btns"
                      onClick={handleProfileClick}>Profile</button>
                      <button className="desktop-nav-btns"
                      onClick={handleBrowseClick}
                      >Browse</button>
                    </>
                  ) : null}
                  <button className="desktop-nav-btns" onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                  </button>
                  <div
                    id="search-bar"
                    className={`desktop-nav-btns ${isSearch ? "open" : ""}`}
                  >
                    <Search />
                  </div>
                </div>
              </div>
              <div className="desktopSignOn col-3 d-flex justify-content-end">
                <button className="desktop-signin-btns me-3"
                onClick={handleSignInClick}
                >
                  Sign In</button>
                <button
                  className="desktop-signup-btns"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
                {showModal && <SignupModal setShowModal={setShowModal} />}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
