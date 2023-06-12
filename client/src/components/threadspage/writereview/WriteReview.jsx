import React from 'react';
import './WriteReview.css';

export default function WriteReview() {
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
                      <h2 id='write-h2'>Review</h2>
                      <div className='row justify-content-between'>
                        <div className='col-12'>
                          <div className='row'>
                            <div className='col-6'>
                              <div className='row'>
                                <div className='col-12'>
                                  <input
                                    type='text'
                                    name='review-title'
                                    placeholder='Title'
                                  />
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-12'>
                                  <input
                                    type='date'
                                    name='watch-date'
                                    id='watch-date'
                                    placeholder={`${Date.now}`}
                                  />
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-12'>
                                  <select
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
                            </div>
                            <div className='col-6'>
                              <div className='row'>
                                <div className='col-12'>
                                  <textarea
                                    name='review-text'
                                    id='review-text'
                                    cols='30'
                                    rows='10'
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                                <button id='review-submit' type="submit">Submit</button>
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
