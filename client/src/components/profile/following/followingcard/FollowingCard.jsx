import React from 'react';
import './FollowingCard.css';

export default function FollowingCard(props) {
  console.log(props)
  const handlePageChange = (username) => {
    window.location.href = `/profile/${username}`;
  }
  return (
    <div id='follow-card' className='container-fluid mt-3 mb-3'>
      <div className='col-12'>
        <div className='row justify-content-center'>
          <div className='col-12 ps-0 pe-0 text-center'>
            <div className='row align-items-center'>
              <div className='col-12 d-flex justify-content-between align-items-center follow-inner'>
                <p id='follow-username' className='m-0'>{props.username}</p>
                <p id='follow-p-btn' className='m-0' onClick={() => handlePageChange(props.username)}>Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
