import React from 'react';
import './ThreadAddReviewModal.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TModalCard from '../tmodalcard/TModalCard';
import axios from 'axios';


export default function ThreadAddReviewModal({
  reviewModalTog,
  closeReviewModal,
  threadData,
  getWriteReview
}) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState('Movies');

  const handleWordChange = (e) => {
    setSelectedWord(e.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  }

  const searchClick = async () => {
    console.log(selectedWord);
    console.log(searchInput);
    handleAPICall();
    console.log(searchResults);
  };
  

  function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
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
        `https://api.themoviedb.org/3/search/${searchType}?query=${searchInput}&include_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}`, {
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`
        }
      }
      )
      .then((res) => {
        if (!(res.status === 200)) {
          throw new Error('TMDb ERROR: Something went wrong.');
        }

        const tmdbData = [];

        res.data.results.map((media) => (
          tmdbData.push({
            type: selectedWord,
            image: `https://image.tmdb.org/t/p/w500/${media.poster_path}` || 'No image.',
            title: media.title,
            releaseDate: media.first_air_date || 'Release date unavailable.',
            id: undefined,
            backdrop: `https://image.tmdb.org/t/p/w500/${media.backdrop_path}` || 'No backdrop.',
            authors: undefined,
            description: media.overview || undefined,
            uuid: createUUID()
          })
        ));

        setSearchResults(tmdbData);
        console.log(searchResults);
        // handleModalTog(true);
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

            res.data.data.map((media) => (
              weebData.push({
                type: selectedWord,
                image: media.node?.main_picture.large || 'No image.',
                title: media.node.title,
                releaseDate: undefined,
                id: undefined,
                backdrop: undefined,
                authors: undefined,
                description: undefined,
                uuid: createUUID()
              })
            ));

            setSearchResults(weebData);
            console.log(searchResults);
            // handleModalTog(true);
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
            `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&page=1&search=${searchInput.replaceAll(' ', '%20')}&exclude_additions=true&page_size=10`
          )
          .then((res) => {
            if (!(res.status === 200)) {
              console.log(res);
              throw new Error('RAWG API ERROR: Something went wrong.');
            }

            const rawgData = []

            res.data.results.map((game) => (
              rawgData.push({
                type: selectedWord,
                image: game.background_image,
                title: game.name,
                releaseDate: game.released,
                id: game.id,
                backdrop: undefined,
                authors: undefined,
                description: undefined,
                uuid: createUUID()
              })
            ));

            setSearchResults(rawgData);
            console.log(searchResults);
            // handleModalTog(true);
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

            res.data.items.map((book) => (
              bookData.push({
                type: selectedWord,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
                title: book.volumeInfo.title,
                releaseDate: undefined,
                id: undefined,
                backdrop: undefined,
                authors: book.volumeInfo.authors || ['No author to display'],
                description: book.volumeInfo.description,
                uuid: createUUID()
              })
            ));

            setSearchResults(bookData);
            console.log(searchResults);
            // handleModalTog(true);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
    }
  };


  // Add api search code

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='backdrop'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`container-fluid ${reviewModalTog ? 'open' : ''}`}
          id='modal-component'
        >
          <div className='row'>
            <div className='col-12' id='thread-modal'>
              <div className='row'>
                <div
                  className='col-12 d-flex justify-content-center text-center'
                  id='modal-title'
                >
                  <div className='row'>
                  </div>
                  <div className='row'>
                    <div id='t-title-container' className='col-12 col-md-6'>
                      <h2 id='t-modal-title' className='modal-title align-self-center'>Search for a</h2>
                    </div>
                    <div id='t-switch-container' className='col-12 col-md-6'>
                      <select
                        id='thread-switch'
                        value={selectedWord}
                        onChange={handleWordChange}
                      >
                        <option value='movie'>Movie</option>
                        <option value='show'>Show</option>
                        <option value='book'>Book</option>
                        <option value='games'>Video Game</option>
                        <option value='anime'>Anime</option>
                        <option value='manga'>Manga</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div id='search-row' className='col-12 d-flex'>
                      <div className="col-12 col-md-6">
                      <input
                        type='text'
                        id='thread-modal-input'
                        onChange={handleInputChange}
                        name='search'
                        placeholder='enter a title'
                      />
                      </div>
                      <div className="col-12 col-md-3">
                      <button id='thread-search-btn' onClick={searchClick}>Search</button>
                      </div>
                    </div>
                  </div>
                  <button id='modal-close' onClick={closeReviewModal}>
                    <img src='./images/circle-xmark-regular.svg' alt='' />
                  </button>
                </div>
              </div>
              {/* Search Results Section */}
              <div className='row justify-content-center'>
                {searchResults.map((result) => (
                  console.log(result),
                  <TModalCard
                    key={result.uuid}
                    image={result.image}
                    title={result.title}
                    releaseDate={result.releaseDate}
                    backDrop={result.backDrop}
                    author={result.author}
                    description={result.description}
                    type={result.type}
                    userData={threadData}
                    getWriteReview={getWriteReview}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
