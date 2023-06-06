import React from 'react';
import { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < window.innerHeight) {
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
      <div className='container-fluid'>
        <div className='row'>
          <nav id='nav-container' className='col-12'>
            <div id='logo-container' className='col-4'>
              <h2 id='nav-logo' className='light-txt'>Logo</h2>
            </div>
            {isMobile && ( // add conditional statement here
            <div className='mobile'>
              <div id='nav-links' className='col-8'>
                <div id='hamburger-icon' onClick={() => toggleMenu()}>
                  <div className={`bar1 bars ${isOpen ? 'open' : ''}`}></div>
                  <div className={`bar2 bars ${isOpen ? 'open' : ''}`}></div>
                  <div className={`bar3 bars ${isOpen ? 'open' : ''}`}></div>
                </div>
                <div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  id='mobile-menu'
                  className={`${isOpen ? 'open' : ''}`}
                >
                  <button
                    className='mobile-nav-btns'
                    href='/'
                    onClick={() => {
                      // handleViewChange('Projects');
                      toggleMenu();
                    }}
                  >
                    My Lists
                  </button>
                  <button
                    className='mobile-nav-btns'
                    href='/'
                    onClick={() => {
                      // handleViewChange('About');
                      toggleMenu();
                    }}
                  >
                    Friends
                  </button>
                  <button
                    className='mobile-nav-btns'
                    href='/'
                    onClick={() => {
                      // handleViewChange('Contact');
                      toggleMenu();
                    }}
                  >
                    Following
                  </button>
                  <button
                    className='mobile-nav-btns'
                    href='/'
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
          </nav>
        </div>
      </div>
    </>
  );
}
