import React from 'react';
import './ReviewCard.css';
import { motion } from 'framer-motion';

export default function ReviewCard(props) {
  const formatTimestamp = (timestamp) => {
    let date = timestamp.split(' ');
    return date[1] + ' ' + date[2] + ' ' + date[3];
  };

  console.log(props);

  const handleCommentClick = () => {
    window.location.href = `/comments/review/${props.id}`
  }

  return (
    <>
      <motion.div
        key={props._id}
        id='review-container'
        className='col-8 mb-3'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div id='review-card' className='row p-0'>
          <div className='col-12 feed-username d-flex justify-content-between align-items-center'>
            <p className='review-username m-0 p-1'>{props.title}</p>
            <img
              className='like-btn'
              src='/images/comments-regular.svg'
              alt='Comment button'
              onClick={()=> handleCommentClick()}
            />
          </div>
        </div>
        <div className='col-12'>
          <div className='row'>
            <div className='col-4'>
              <img id='imageLeft' src={props.image} alt='' />
            </div>
            <div
              id='review-text-container'
              className='col-8 pt-2 justify-content-between align-items-center'
            >
              <div className='row'>
                <div className='col-12'>
                  <p id='review-date'>{formatTimestamp(props.date)}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <p id='review-date'>{'Rating: ' + props.rating}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <p id='review-desc' className='content-desc'>{props.text}</p>
                </div>
              </div>
            </div>
          </div>
         
          <div className='row'>
            <div className='col-12'>
              <button id='review-delete' className='social-btns'>delete</button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
