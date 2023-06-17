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
  const [logoState, setLogoState] = useState("/images/threadLogo.png");
  const [isHovered, setIsHovered] = useState(false);
  const loggedIn = Auth.loggedIn();

  // const history = useHistory();

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

  const onHover = () => {
    setIsHovered(true);
    setLogoState("/images/threadLogoRed.png");
  };

  const onNoHover = () => {
    setIsHovered(false);
    setLogoState("/images/threadLogo.png");
  };

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
                <a href="/" id="mobile-nav-logo" className="light-txt ">
                  THREADI
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
                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="mobile-nav-btns"
                      href="/social"
                    >
                      Social
                    </motion.a>

                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="mobile-nav-btns"
                      href="/profile/${userData.username}"
                      onClick={() => {
                        // handleViewChange('About');
                        toggleMenu();
                      }}
                    >
                      Profile
                    </motion.a>

                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="mobile-nav-btns"
                      href="/browse"
                      onClick={() => {
                        // handleViewChange('Contact');
                        toggleMenu();
                      }}
                    >
                      Browse
                    </motion.a>
                    <motion.a
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1 }}
                      className="mobile-nav-btns"
                      href="/threadspage"
                      onClick={() => {
                        // handleViewChange('Home');
                        toggleMenu();
                      }}
                    >
                      Logout
                    </motion.a>
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
              <div id="logo-container" className="col-2 d-flex">
                <div className="col-12 d-flex align-items-center">
                  <a
                    id="nav-logo"
                    href="/"
                    className="light-txt"
                    onMouseEnter={onHover}
                    onMouseLeave={onNoHover}
                  >
                    THREADI
                  </a>
                  <img id="nav-img-logo" src={logoState} alt="broken" />
                </div>
              </div>
              <div className="desktop col-8 d-flex">
                <div className="desktopNav col-12 d-flex align-items-center justify-content-center">
                  {loggedIn ? <HeaderNav /> : null}
                </div>
              </div>
              <div className="col-2">
              {loggedIn ? <NavSIButtons /> : <NavSOButtons />}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
