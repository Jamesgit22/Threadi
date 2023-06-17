/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './UserThreads.css';

export default function UserThreads(
  props,
  { handlereviewModalTog, getSingleThread }
) {
  console.log(typeof props.date);
  const date = props.date.split(' ');
  const fDate = date[1] + ' ' + date[2] + ' ' + date[3];

  const sendData = () => {
    props.getSingleThread(props.id);
  };

  return (
    <>
      <div className='col-8 thread-card mt-3'>
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
                onClick={console.log('delete')}
              />
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </>
  );
}
