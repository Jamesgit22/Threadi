import React from 'react';
import '../../profile/Profile.css';
import { useMutation } from '@apollo/client';
import { DELETE_THREAD } from '../../../utils/mutations';
import { motion } from 'framer-motion';

//ThreadCard needs these props to work properly
//key
//id
//title
//date
//description

export default function ThreadCard(props) {
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

  const handleCommentClick = () => {
    window.location.href = `/comments/thread/${props.id}`
  }

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
          <div className='col-12 thread-title-sec d-flex justify-content-between align-items-center'>
            <h3 className='thread-card-title m-0'>{props.title}</h3>
            <p id='thread-card-date' className='m-0'>{fDate}</p>
          </div>
        </div>
        {/* content row */}
        <div className='row'>
          <div id='box-container' className='col-12 d-flex '>
            {/* scroll row */}
            <div className='col-12 threads-box p-0'>
              <div className='row'>
                <div className='col-6 d-flex'>
                  <p id='thread-description' style={{ width: '100%', wordWrap: 'break-word' }}>
                    {props.description || 'No description'}
                  </p>
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
            <img
                className='like-btn'
                src='/images/comments-regular.svg'
                alt='Comment button'
                onClick={() => handleCommentClick()}
              />
            </div>
            <div className='col-4 d-flex align-items-center'>
              <button className='thread-open-btn m-2' onClick={sendData}>
                Open
              </button>
            </div>
            <div className='col-4 justify-content-end gap-2 d-flex align-items-center'>
              
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
