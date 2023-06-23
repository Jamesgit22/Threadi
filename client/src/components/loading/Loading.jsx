import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100'>
          <div id='loader' className='spinner-border' role='status'></div>
        </div>
      </div>
    </>
  );
}
