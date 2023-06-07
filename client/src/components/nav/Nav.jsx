import React from "react";
import { useState, useEffect } from "react";
import "./Nav.css";
import Search from "../search/Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1430) {
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
      <div className="header container-fluid">
        <div className="row">
          <nav id="nav-container" className="col-12">
            <div id="logo-container" className="col-4">
              <h2 id="nav-logo" className="light-txt">
                THREADI
              </h2>
            </div>
            {isMobile && ( // add conditional statement here
              <div className="mobile">
                <div id="nav-links" className="col-8">
                  <div id="hamburger-icon" onClick={() => toggleMenu()}>
                    <div className={`bar1 bars ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar2 bars ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar3 bars ${isOpen ? "open" : ""}`}></div>
                  </div>
                  <div id="mobile-menu" className={`${isOpen ? "open" : ""}`}>
                    <button
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Projects');
                        toggleMenu();
                      }}
                    >
                      My Lists
                    </button>
                    <button
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('About');
                        toggleMenu();
                      }}
                    >
                      Friends
                    </button>
                    <button
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Contact');
                        toggleMenu();
                      }}
                    >
                      Following
                    </button>
                    <button
                      className="mobile-nav-btns"
                      href="/"
                      onClick={() => {
                        // handleViewChange('Home');
                        toggleMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!isMobile && ( // add conditional statement here
              <div className="desktop">
                <div className="desktopNav">
                  <button className="desktop-nav-btns">Social</button>
                  <button className="desktop-nav-btns">Profile</button>
                  <button className="desktop-nav-btns">Browse</button>
                  <button className="desktop-nav-btns">
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                  </button>
                  {/* <div className="desktop-nav-btns">
                    <Search />
                  </div> */}
                </div>
                <div className="desktopSignOn">
                  <button className="desktop-signin-btns">Sign In</button>
                  <button className="desktop-signup-btns">Sign Up</button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
