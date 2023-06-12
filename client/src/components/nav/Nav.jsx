import React from "react";
import { useState, useEffect } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Auth from "../../utils/auth";
import HeaderNav from "./headernav/HeaderNav";
import NavSIButtons from "./navbuttons/NavSOButtons";
import NavSOButtons from "./navbuttons/NavSIButtons";

// resolve conflicts.
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loggedIn = Auth.loggedIn();

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
                <h2 id="mobile-nav-logo" className="light-txt ">
                  THREADI
                </h2>
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
                  <h2 id="nav-logo" className="light-txt">
                    THREADI
                  </h2>
                  <img
                    id="nav-img-logo"
                    src="/images/threadLogo.png"
                    alt="broken"
                  />
                </div>
              </div>
              <div className="desktop col-6 d-flex">
                <div className="desktopNav col-12 d-flex align-items-center justify-content-center">
                  { loggedIn ? <HeaderNav /> : null}
                </div>
              </div>
              { loggedIn ? <NavSIButtons /> : <NavSOButtons /> }
            </nav>
          </div>
        </div>
      )}
    </>
  );
}