import React from 'react';
import { useState } from 'react';
import './Browse.css';
import { motion } from 'framer-motion';
import { faBriefcaseClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BrowseModal from './browseModal/BrowseModal';

export default function Browse() {
  const [selectedWord, setSelectedWord] = useState('Movies');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalTog, setModalTog] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchOptions = ['Movies', 'Shows', 'Books', 'Games', 'Anime', 'Manga'];

  const searchClick = async () => {
    console.log(selectedWord);
    console.log(searchInput);
    handleAPICall();
    console.log(searchResults);
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

  const handleWordChange = (e) => {
    setSelectedWord(e.target.value);
  };

  const handleModalTog = () => {
    setModalTog((open) => !open);
  };

  const closeModal = () => {
    setModalTog(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  function movieShowSearch() {
    var searchType;

    if (selectedWord === 'Movies') {
      searchType = 'movie';
      console.log(selectedWord);
      console.log(searchType);
    } else {
      searchType = 'tv';
      console.log(selectedWord);
      console.log(searchType);
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (!(res.status === 200)) {
          throw new Error('TMDb ERROR: Something went wrong.');
        }

        const tmdbData = [];

        res.data.results.map((media) =>
          tmdbData.push({
            type: selectedWord,
            image:
              `https://image.tmdb.org/t/p/w500/${media.poster_path}` ||
              'No image.',
            title: media.title,
            releaseDate: media.first_air_date || 'Release date unavailable.',
            id: undefined,
            backdrop:
              `https://image.tmdb.org/t/p/w500/${media.backdrop_path}` ||
              'No backdrop.',
            authors: undefined,
            description: media.overview || undefined,
            uuid: createUUID(),
          })
        );

        setSearchResults(tmdbData);
        console.log(searchResults);
        handleModalTog(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function animangaSearch() {
    axios
      .get(
        `https://floating-headland-95050.herokuapp.com/https://api.myanimelist.net/v2/${selectedWord.toLowerCase()}?q=${searchInput}`,
        {
          headers: {
            'X-MAL-CLIENT-ID': `${process.env.REACT_APP_MAL_CLIENT_ID}`,
          },
        }
      )
      .then((res) => {
        if (!(res.status === 200)) {
          throw new Error('MAL_API ERROR: Something went wrong.');
        }

        const weebData = [];

        console.log(res);

        res.data.data.map((media) =>
          weebData.push({
            type: selectedWord,
            image: media.node?.main_picture.large || 'No image.',
            title: media.node.title,
            releaseDate: undefined,
            id: undefined,
            backdrop: undefined,
            authors: undefined,
            description: undefined,
            uuid: createUUID(),
          })
        );

        setSearchResults(weebData);
        console.log(searchResults);
        handleModalTog(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //comment
  const handleAPICall = async (e) => {
    // eslint-disable-next-line default-case
    switch (selectedWord) {
      case 'Video Games': {
        axios
          .get(
            `https://api.rawg.io/api/games?key=${
              process.env.REACT_APP_RAWG_API_KEY
            }&page=1&search=${searchInput.replaceAll(
              ' ',
              '%20'
            )}&exclude_additions=true&page_size=10`
          )
          .then((res) => {
            if (!(res.status === 200)) {
              console.log(res);
              throw new Error('RAWG API ERROR: Something went wrong.');
            }

            const rawgData = [];

            res.data.results.map((game) =>
              rawgData.push({
                type: selectedWord,
                image: game.background_image,
                title: game.name,
                releaseDate: game.released,
                id: game.id,
                backdrop: undefined,
                authors: undefined,
                description: undefined,
                uuid: createUUID(),
              })
            );

            setSearchResults(rawgData);
            console.log(searchResults);
            handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case 'Movies': {
        movieShowSearch();
        break;
      }
      case 'Shows': {
        movieShowSearch();
        break;
      }
      case 'Anime': {
        animangaSearch();
        break;
      }
      case 'Manga': {
        animangaSearch();
        break;
      }
      case 'Books': {
        axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
          .then((res) => {
            if (!(res.status === 200)) {
              throw new Error('BookAPI ERROR: Something went wrong.');
            }

            const bookData = [];

            res.data.items.map((book) =>
              bookData.push({
                type: selectedWord,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
                title: book.volumeInfo.title,
                releaseDate: undefined,
                id: undefined,
                backdrop: undefined,
                authors: book.volumeInfo.authors || ['No author to display'],
                description: book.volumeInfo.description,
                uuid: createUUID(),
              })
            );

            setSearchResults(bookData);
            console.log(searchResults);
            handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
    }
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
                      className='d-flex col-12 justify-content-center align-items-center'
                    >
                      <motion.div
                        className='row justify-content-center'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className='col-8 d-flex justify-content-end align-items-center'>
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
                                disabled={true}
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
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-10 p-0 m-0'>
                    <motion.input
                      initial={{ opacity: 0, y: '30px' }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onChange={handleInputChange}
                      name='search'
                      id='browse-input'
                      type='text'
                      placeholder='Enter a title'
                    />
                  </div>
                  <div className='row justify-content-center'>
                    <div className='col-12'>
                      <motion.button
                        id='browse-search-btn'
                        onClick={() => searchClick()}
                        initial={{ opacity: 0, y: '30px' }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        Search
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className='col-12 pt-3 text-center'>
                  {/* <p id='browse-intro'>
                    Scroll through<br></br>custom threads to discover <br></br>
                    <span id='new'>NEW</span> content below.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section end */}
        {/* Browse Threads */}
        {/* <div className='row pt-5'>
          
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
        </div> */}
        {modalTog && (
          <BrowseModal
            closeModal={closeModal}
            modalTog={modalTog}
            searchResults={searchResults}
          />
        )}
      </div>
    </>
  );
}
