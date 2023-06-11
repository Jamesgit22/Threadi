import React from 'react';
import { useState } from 'react';
import './Browse.css';
import { motion } from 'framer-motion';
import { faBriefcaseClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Browse() {
  const [selectedWord, setSelectedWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const callAPI = (e) => {
    axios
      .post('/api/third-party/browseSearch', {
        searchInput: searchInput,
        selectedWord: selectedWord
      })
      .then((res) => {
        setSearchResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWordChange = (e) => {
    setSelectedWord(e.target.value);
  };

  const handleUpClick = () => {
    const newIndex = (selectedIndex + 1) % searchOptions.length;
    setSelectedWord(searchOptions[newIndex]);
    setSelectedIndex(newIndex);
  };

  const handleDownClick = () => {
    const newIndex =
      (selectedIndex - 1 + searchOptions.length) % searchOptions.length;
    setSelectedWord(searchOptions[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <>
      <div id='browse-main' className='container-fluid'>
        {/* Search Bar */}
        <div id='browse-background'>
          <div id='browse-overlay'>
            <div className='row justify-content-center text-center'>
              <div className='col-11 pt-5'>
                <div className='row pt-5'>
                  <div className='col-12 pb-3'>
                    <div
                      id='switch-main'
                      className='d-flex justify-content-center align-items-center'
                    >
                      <div className='row justify-content-center'>
                        <div className='col-6 d-flex justify-content-end align-items-center'>
                          <h2 id='browse-msg'>Search for</h2>
                        </div>
                        <div id='browse-switch-container' className='col-4'>
                          <div className='row'>
                            <div className='col-12'>
                              <img
                                src='/images/angle-up-solid.svg'
                                alt='up arrow'
                                id='up-btn'
                                className='arrow'
                                onClick={handleUpClick}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12'>
                              <select
                                id='browse-switch'
                                value={selectedWord}
                                onChange={handleWordChange}
                                disabled='true'
                              >
                                {searchOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12'>
                              <img
                                src='/images/angle-down-solid.svg'
                                alt='down arrow'
                                id='down-btn'
                                className='arrow'
                                onClick={handleDownClick}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-10 p-0 m-0'>
                    <motion.input
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.8 }}
                      id='browse-input'
                      type='text'
                      placeholder='Enter a title'
                    />
                  </div>
                  <div className='row justify-content-center'>
                    <div className='col-12'>
                      <button id='browse-search-btn'>Search</button>
                    </div>
                  </div>
                </div>
                <div className='col-12 pt-3 text-center'>
                  <p id='browse-intro'>
                    Scroll through<br></br>custom threads to discover <br></br>
                    <span id='new'>NEW</span> content below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section end */}
        {/* Browse Threads */}
        <div className='row pt-5'>
          {/* section */}
          <div className='col-12 pt-5'>
            <div className='row'>
              <div className='col-5 text-center'>
                <h3 className='browse-username'>Username</h3>
              </div>
            </div>
            <div className='row'>
              <div id='box-container' className='col-12 d-flex'>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-polina-zimmerman-3747279.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 pt-5'>
            <div className='row'>
              <div className='col-5 text-center'>
                <h3 className='browse-username'>Username</h3>
              </div>
            </div>
            <div className='row'>
              <div id='box-container' className='col-12 d-flex'>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-polina-zimmerman-3747279.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 pt-5'>
            <div className='row'>
              <div className='col-5 text-center'>
                <h3 className='browse-username'>Username</h3>
              </div>
            </div>
            <div className='row'>
              <div id='box-container' className='col-12 d-flex'>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-polina-zimmerman-3747279.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 box'>
                  <div className='row'>
                    <div className='col-4'>
                      <h4 className='browse-titles'>Thread Title</h4>
                    </div>
                    <div className='col-8'>
                      <img
                        className='browse-imgs'
                        src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
