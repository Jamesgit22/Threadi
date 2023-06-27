import React from 'react';
import '../../profile/Profile.css';
// import NormalTheme from './cardtheme/NormalTheme'
// import ProfileTheme from './cardtheme/ProfileTheme'
import { useMutation } from '@apollo/client';
import { DELETE_THREAD } from '../../../utils/mutations';
import { motion } from 'framer-motion';

//ThreadCard needs these props to work properly
//key
//id
//title
//date
//description
//getSingleThread method

export default function ThreadCard(props, { getSingleThread }) {
  const [deleteThread] = useMutation(DELETE_THREAD);
  const date = props.date.split(' ');
  const fDate = date[1] + ' ' + date[2] + ' ' + date[3];

  let isNormal;

  if (!(window.location.href.split('/')[1] === 'profile')) {
    isNormal = true;
  } else {
    isNormal = false;
  }

  const sendData = () => {
    window.location.href = `/thread/${props.id}`;
  };

  const handleDelete = async (threadId) => {
    try {
      await deleteThread({
        variables: { threadId },
      });

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        className='col-8 thread-card mt-3'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className='row'>
          <div className='col-12 thread-title-sec d-flex justify-content-between align-content-center'>
            <h3 className='thread-card-title m-0'>{props.title}</h3>
            <p className='m-0'>{fDate}</p>
          </div>
        </div>
        {/* content row */}
        <div className='row'>
          <div id='box-container' className='col-12 d-flex '>
            {/* scroll row */}
            <div className='col-12 threads-box p-0'>
              <div className='row'>
                <div className='col-6'>
                  <h4 className='thread-description'>
                    {props.description || 'No description'}
                  </h4>
                </div>
                <div className='col-6 p-0 m-0'>
                  <img
                    className='threads-imgs'
                    src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                    alt=''
                  />
                </div>
              </div>
            </div>
            {/* scroll row end */}
          </div>
        </div>
        <div className='row'>
          <div className='col-12 d-flex justify-content-evenly align-items-center thread-btns-container'>
            <div className='col-4'>
              <p className='m-0 pt-1 pb-1'></p>
            </div>
            <div className='col-4'>
              <button className='thread-open-btn' onClick={sendData}>
                Open
              </button>
            </div>
            <div className='col-4 text-end'>
              <img
                src='/images/trash-can-solid.svg'
                alt='delete button'
                className='m-0 pt-1 pb-1 trash-can'
                onClick={() => handleDelete(props.id)}
              />
            </div>
          </div>
        </div>
        {/* end */}
      </motion.div>
    </>
  );
}
