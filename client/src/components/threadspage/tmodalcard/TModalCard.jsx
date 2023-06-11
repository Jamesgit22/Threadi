import React from 'react';
import './TModalCard.css';

export default function TModalCard(props) {
  return (
    <>
    <div className='col-11 item-container'>
        <div className='row'>
          <div className='col-12 p-0'>
            <p className='item-title'>{props.title}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-6 item-img-container'>
                <img className='item-img' src={props.image} alt='' />
              </div>
              <div className='col-6'>
                <div className='row'>
                  <div className='col-12'>
                    <p className='item-desc'>{props.desc || ''}</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 text-end'>
                    <button className='item-btn'>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
