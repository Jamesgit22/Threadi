import React from 'react';
import './CommentCard.css';

export default function CommentCard() {
  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-8 comment-card'>
          {/* Top row of card */}
          <div className='row p-0 '>
            <div className='col-12 card-type d-flex align-items-center'>
              <div className='col-11'>
                <p className=' m-0 p-1'>{'type title placeholder'}</p>
              </div>
              <div className='col-1 d-flex align-items-center justify-content-center'>
                <p className='likes-count'>{0}</p>
                <img
                  className='like-btn'
                  src='/images/thumbs-up-regular.svg'
                  alt='like button'
                />
              </div>
            </div>
          </div>
          {/* end top row */}
          {/* content section of card */}
          <div className='row'>
            <div className='col-12 d-flex pt-2 justify-content-between align-items-center'>
              <h3 className='com-card-username'>{'username'}</h3>
              {/* -----------username of the comments owner here */}
              <p>{'formatTimestamp(thread.timestamp)'}</p>
              {/* ----------Timestamp */}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 content-container'>
              <p className='content-desc'>{'comment content'}</p>
              {/* ------------content of comment goes here */}
            </div>
          </div>
          {/* End of content section */}
          <div className='row'>
            <div className='col-11 d-flex align-items-center'>
              <button className='comment-card-btns' onClick={''}>
                {' '}
                {/* ----------------- This could be removed or used as a comment button*/}
                comment
              </button>
            </div>
            <div className='col-1 d-flex align-items-center'>
              <p className='comments-count p-2'>{0}</p>
              {/* ---------- Amount of comments */}
              <img
                className='comments-btn'
                src='/images/comments-regular.svg'
                alt='comment button'
                onClick={'handleCommentBtn'}
              />{' '}
              {/* ----------Comments bubble button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
