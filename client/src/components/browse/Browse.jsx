import React from 'react';
import { useState } from 'react';
import './Browse.css';
import { motion } from 'framer-motion';
import { faBriefcaseClock } from '@fortawesome/free-solid-svg-icons';

export default function Browse() {
  const [selectedWord, setSelectedWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //MAL API URL: https://api.myanimelist.net/v2/(manga or anime)?q=(name of show or manga)
  //TMDB API URL: https://api.themoviedb.org/3/search/('tv' or 'movie')?query=(name of show or movie)&include_adult=false&language=en-US&page=1
  //RAWG API URL: `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=1&search=(name of game)&exclude_additions=true&page_size=10`
  //Google Books API URL: https://www.googleapis.com/books/v1/volumes?q=(name of book)

  const handleWordChange = (e) => {
    setSelectedWord(e.target.value);
  };

  const handleAPICall = (e) => {
    switch (selectedWord) {
      case 'Video Games': {
        axios
          .get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=1&search=${searchInput}&exclude_additions=true&page_size=10`)
          .then((res) => {

            if (!res.ok) {
              throw new Error('RAWG API ERROR: Something went wrong.');
            };

            const rawgData = res.results.map((game) => ({
              type: selectedWord,
              image: game.background_image,
              title: game.name,
              releaseDate: game.released,
              id: game.id
            }));

            setSearchResults(rawgData);
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
        };

        axios
          .get(`https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=1`)
          .then((res) => {

            if (!res.ok) {
              throw new Error('TMDb ERROR: Something went wrong.');
            };

            const tmdbData = res.results.map((media) => ({
              type: selectedWord,
              backdrop: `https://image.tmdb.org/t/p/w500/${media.backdrop_path}` || 'No backdrop.',
              image: `https://image.tmdb.org/t/p/w500/${media.poster_path}` || 'No image.',
              title: media.name,
              description: media.overview || 'No description.',
              releaseDate: media.first_air_date || 'Release date unavailable.'
            }));

            setSearchResults(tmdbData);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case 'Anime' || 'Manga': {
        axios
          .get(`https://api.myanimelist.net/v2/${selectedWord.toLowerCase()}?q=${searchInput}`, {
            headers: {
              'X-MAL-CLIENT-ID':`${process.env.MAL_CLIENT_ID}`
            }
          })
          .then((res) => {

            if (!res.ok) {
              throw new Error('MAL_API ERROR: Something went wrong.');
            };

            const weebData = res.data.map((media) => ({
              type: selectedWord,
              title: media.node.title,
              image: media.node?.main_picture.large || 'No image.'
            }));

            setSearchResults(weebData);
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
            };

            const bookData = res.items.map((book) => ({
              type: selectedWord,
              authors: book.volumeInfo.authors || ['No author to display'],
              title: book.volumeInfo.title,
              description: book.volumeInfo.description,
              image: book.volumeInfo.imageLinks?.thumbnail || ''
            }));

            setSearchResults(bookData);
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
                    <div className='row'>
                      <div className='col-6 d-flex justify-content-end'>
                        <h2 id='browse-msg'>Search for</h2>
                      </div>
                      <div id='browse-switch-container' className='col-6'>
                        <div className='row'>
                          <div className='col-12'>
                            <button id='up-btn'>Up</button>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-12'>
                            <select id='browse-switch'
                              value={selectedWord}
                              onChange={handleWordChange}
                            >
                              <option value='movie'>Movie</option>
                              <option value='show'>Show</option>
                              <option value='book'>Book</option>
                              <option value='games'>Video Games</option>
                              <option value='anime'>Anime</option>
                              <option value='manga'>Manga</option>
                            </select>
                            {/* <h2>{selectedWord}</h2> */}
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-12'>
                            <button id='down-btn'>Down</button>
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
                    <span id='new'>NEW</span> content bellow.
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
