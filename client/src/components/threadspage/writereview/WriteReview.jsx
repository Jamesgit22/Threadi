import React from 'react';
import './WriteReview.css';
import { useState } from 'react';

export default function WriteReview(media, props) {
  const mediaData = media.media;
  const [userFormData, setUserFormData] = useState({
    title: '',
    review: '',
    date: '',
    rating: 0,
    image: '',
    type: mediaData.type,
  });
  console.log(mediaData);
  console.log(userFormData);

  const date = new Date();
  const fDate = date.toISOString().split('T')[0];

  const threadReload = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div id='write-main' className='container-fluid p-0 m-0'>
        <div id='write-background'>
          <div id='write-overlay'>
            {/* top section */}
            <div className='row m-0 p-0'>
              <div id='write-top' className='col-12 p-0 m-0'>
                <div className='row'>
                  <div
                    id='write-page-title'
                    className='col-12 text-center pt5'
                  ></div>
                </div>
                <div className='row justify-content-center'>
                  <div id='form-container' className='col-8 text-center'>
                    <form>
                      <h2 id='write-h2'>Add Review</h2>
                      <button onClick={threadReload}>
                        <img
                          id='write-exit'
                          src='./images/circle-xmark-regular.svg'
                          alt='exit button'
                        />
                      </button>
                      <div
                        id='top-card-border'
                        className='row justify-content-between'
                      >
                        <div className='col-12'>
                          <div className='row'>
                            <div className='col-6 item-img-container'>
                              <img
                                className='item-img'
                                src={mediaData.image}
                                alt='movie poster'
                              />
                            </div>
                            <div className='rightSide col-6'>
                              <div className='row'>
                                <div className='col-12'>
                                  <h2 id='review-title' className='item-title'>
                                    {mediaData.title}
                                  </h2>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-12'>
                                  <div>Date watched: </div>
                                  <input
                                    className='dateInput'
                                    type='date'
                                    name='watch-date'
                                    id='watch-date'
                                    defaultValue={fDate}
                                  />
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-12'>
                                  <div>Rating: </div>
                                  <select
                                    className='ratingInput'
                                    name='rating'
                                    id='review-rating'
                                    placeholder='1'
                                  >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                  </select>
                                </div>
                              </div>
                              <div className='thought row'>
                                <div className='col-12'>
                                  <div>Tell us what you thought about it: </div>
                                  <textarea
                                    className='reviewInput'
                                    name='review-text'
                                    id='review-text'
                                    cols='100'
                                    rows='10'
                                    placeholder='review'
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div id='submit-container' className='col-12'>
                              <button id='review-submit' type='submit'>
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
          </div>
        </div>
      </div>
    </>
  );
}
