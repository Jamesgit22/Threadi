import React from 'react';
import './Following.css';
import FollowingCard from './followingcard/FollowingCard';

export default function Following(props) {
  return (
    <div id='following-container' className='container-fluid'>
      <div className='col-12'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h2 id='following-h2'>
                  Following <span id='following-count'>{props.count}</span>
                </h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                {props.followList.map((item) => (
                  <FollowingCard username={item.username}></FollowingCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
