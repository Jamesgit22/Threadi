import React from 'react';
import './BModalCard.css';

export default function BModalCard(props) {
  return (
    <>
      <div className='col-11 item-container'>
        <div className='row'>
          <div className='col-12'>
            <div className='row b-modal-container'>
              <div className='col-sm-12 col-md-4 item-img-container'>
                <img className='item-img' src={props.image} alt='' />
              </div>
              <div className='col-sm-12 col-md-8 info-side'>
                <div className='row'>
                  <div className='col-12 p-0 text-center'>
                    <p className='item-title'>{props.title}</p>
                  </div>
                  <div className='col-12 item-desc-container'>
                    <p className='item-desc'>
                      {props.description || 'No Description Available'}
                    </p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 text-end item-btn-container'>
                    <button className='item-btn'>Open</button>
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
