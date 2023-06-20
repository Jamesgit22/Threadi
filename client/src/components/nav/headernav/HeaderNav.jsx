import React from 'react';
import '../Nav.css';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ME, GET_PROFILE } from '../../../utils/queries';
import { useState } from 'react';
import { motion } from 'framer-motion';

function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  let { loading, data } = useQuery(GET_ME);
  const [getProfile, { data: dataP, loading: loadingP }] =
    useLazyQuery(GET_PROFILE);
  const userData = data?.me || {};

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const goToProfile = async () => {
    try {
      const result = await getProfile({ variables: { username: searchInput } });
      
      if (!result.data.getProfile.username) {
        console.log('no user exists');
      } else {
        window.location.href = `/profile/${result.data.getProfile.username}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSearchTog = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <a className='desktop-nav-btns' href='/social'>
        Social
      </a>
      <a className='desktop-nav-btns' href={`/profile/${userData.username}`}>
        Profile
      </a>
      <a className='desktop-nav-btns' href='/browse'>
        Browse
      </a>
      <a className='desktop-nav-btns' href='/mythreads'>
        My Threads
      </a>
      <div id='nav-search-box' className='ms-3'>
        <img
          id='eye-glass'
          src='/images/magnifying-glass-solid.svg'
          alt=''
          onClick={() => handleSearchTog()}
        />
        <input
          id='search-username'
          className={`${isOpen ? 'open' : ''}`}
          type='text'
          placeholder='Search username'
          value={searchInput.username}
          onChange={handleInputChange}
        />
        <button
          id='search-username-btn'
          className={`${isOpen ? 'open' : ''}`}
          onClick={goToProfile}
        >
          search
        </button>
      </div>
    </>
  );
}

export default HeaderNav;
