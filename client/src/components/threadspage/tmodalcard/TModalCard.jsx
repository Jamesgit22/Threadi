import React from 'react';
import './TModalCard.css';
import { ADD_REVIEW } from '../../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function TModalCard(props, { userData, getWriteReview }) {
  const [addReview, { error }] = useMutation(ADD_REVIEW)


  // const addReviewHandler = async () => {

  //   const { data } = await addReview({
  //     variables: {}
  //   })

  // }

  const handleTransition = () => {
    console.log(props);
    props.getWriteReview(props);
  }


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
                    <p className='item-desc'>{props.description || ''}</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 text-end'>
                    <button className='item-btn' onClick={handleTransition}>Add</button>
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
