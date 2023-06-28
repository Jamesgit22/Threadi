import React from 'react';
import './CommentCard.css';
import { motion } from 'framer-motion';

export default function CommentCard(props) {
  const formatTimestamp = (timestamp) => {
    let date = timestamp.split(' ');
    return date[1] + ' ' + date[2] + ' ' + date[3];
  };

  return (
    <>
      <motion.div
        className='row justify-content-center'
        initial={{ opacity: 0, x: '-100px' }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className='col-8 comment-card mb-4'>
          {/* Top row of card */}
          <div className='row p-0 '>
            <div className='col-12 card-type d-flex align-items-center'>
              <div className='col-10'>
                <h3 className='com-card-username'>{props.author.username}</h3>
              </div>
              <div className='col-2 d-flex align-items-center justify-content-center'>
                <p>{formatTimestamp(props.timestamp)}</p>
              </div>
            </div>
          </div>
          {/* end top row */}
          {/* content section of card */}
          <div className='row'></div>
          <div className='row'>
            <div className='col-12 content-container d-flex align-items-center'>
              <p className='content-desc'>{props.text}</p>
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
      </motion.div>
    </>
  );
}
