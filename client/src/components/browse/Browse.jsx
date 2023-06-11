import React from 'react';
import { useState } from 'react';
import './Browse.css';
import { motion } from 'framer-motion';
import { faBriefcaseClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BrowseModal from './browseModal/BrowseModal';

export default function Browse() {
  const [selectedWord, setSelectedWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalTog, setModalTog] = useState(false);
  const searchOptions = [
    'Movies',
    'Shows',
    'Books',
    'Video Games',
    'Anime',
    'Manga',
  ];

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

  //comment
  const handleAPICall = (e) => {
    // eslint-disable-next-line default-case
    switch (selectedWord) {
      case 'Video Games': {
        axios
          .get(
            `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&page=1&search=${searchInput}&exclude_additions=true&page_size=10`
          )
          .then((res) => {
            if (!res.ok) {
              throw new Error('RAWG API ERROR: Something went wrong.');
            }

            const rawgData = res.results.map((game) => ({
              type: selectedWord,
              image: game.background_image,
              title: game.name,
              releaseDate: game.released,
              id: game.id,
              backdrop: undefined,
              authors: undefined,
              description: undefined,
              i: rawgData.length
            }));

            setSearchResults(rawgData);
            console.log(searchResults);
            handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case 'Movie' || 'Show': {
        var searchType;

        if (selectedWord === 'Movie') {
          searchType = 'movie';
        } else {
          searchType = 'tv';
        }

        axios
          .get(
            `https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=1`
          )
          .then((res) => {
            if (!res.ok) {
              throw new Error('TMDb ERROR: Something went wrong.');
            }

            const tmdbData = res.results.map((media) => ({
              type: selectedWord,
              image: `https://image.tmdb.org/t/p/w500/${media.poster_path}` || 'No image.',
              title: media.name,
              releaseDate: media.first_air_date || 'Release date unavailable.',
              id: undefined,
              backdrop: `https://image.tmdb.org/t/p/w500/${media.backdrop_path}` || 'No backdrop.',
              authors: undefined,
              description: media.overview || undefined,
              i: tmdbData.length
            }));

            setSearchResults(tmdbData);
            console.log(searchResults);
            handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case 'Anime' || 'Manga': {
        axios
          .get(
            `https://api.myanimelist.net/v2/${selectedWord.toLowerCase()}?q=${searchInput}`,
            {
              headers: {
                'X-MAL-CLIENT-ID': `${process.env.REACT_APP_MAL_CLIENT_ID}`,
              },
            }
          )
          .then((res) => {
            if (!res.ok) {
              throw new Error('MAL_API ERROR: Something went wrong.');
            }

            const weebData = res.data.map((media) => ({
              type: selectedWord,
              image: media.node?.main_picture.large || 'No image.',
              title: media.node.title,
              releaseDate: undefined,
              id: undefined,
              backdrop: undefined,
              authors: undefined,
              description: undefined,
              i: weebData.length
            }));

            setSearchResults(weebData);
            console.log(searchResults);
            handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case 'Book': {
        axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('BookAPI ERROR: Something went wrong.');
            }

            const bookData = res.items.map((book) => ({
              type: selectedWord,
              image: book.volumeInfo.imageLinks?.thumbnail || '',
              title: book.volumeInfo.title,
              releaseDate: undefined,
              id: undefined,
              backdrop: undefined,
              authors: book.volumeInfo.authors || ['No author to display'],
              description: book.volumeInfo.description,
              i: bookData.length
            }));

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
                      <button
                        id='browse-search-btn'
                        onClick={() => searchClick()}
                      >
                        Search
                      </button>
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
