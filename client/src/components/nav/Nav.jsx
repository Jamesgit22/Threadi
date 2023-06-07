import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './Nav.css';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <nav id='nav-container' className='col-12'>
            <div id='logo-container' className='col-4'>
              <h2 id='nav-logo' className='light-txt'>
                Logo
              </h2>
            </div>
            <div id='nav-links' className='col-8'>
              <div id='hamburger-icon' onClick={() => toggleMenu()}>
                <div className={`bar1 bars ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar2 bars ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar3 bars ${isOpen ? 'open' : ''}`}></div>
              </div>
              <div
                id='mobile-menu'
                className={`${isOpen ? 'open' : ''}`}
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className='mobile-nav-btns'
                  href='/'
                  onClick={() => {
                    // handleViewChange('Projects');
                    toggleMenu();
                  }}
                >
                  My Lists
                </motion.button>
                <motion.button
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.4, delay: 0.4 }}
                  className='mobile-nav-btns'
                  href='/'
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
                  transition={{ duration: 0.4, delay: 0.6  }}
                  className='mobile-nav-btns'
                  href='/'
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
                  transition={{ duration: 0.4, delay: 0.8  }}
                  className='mobile-nav-btns'
                  href='/'
                  onClick={() => {
                    // handleViewChange('Home');
                    toggleMenu();
                  }}
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
