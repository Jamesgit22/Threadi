import React from 'react';
import { useState } from 'react';
import ThreadAddReviewModal from '../threadsaddreviewmodal/ThreadAddReviewModal';

export default function SingleThread() {
  const [reviewModalTog, setReviewModalTog] = useState(false);


  const closeReviewModal = () => {
    setReviewModalTog(false);
  };


  const handleReviewModalTog = () => {
    setReviewModalTog((open) => !open);
  };
  return (
    <>
      <div id='threads-main' className='container-fluid p-0 m-0'>
        <div id='thread-background'>
          <div id='threads-overlay'>
            {/* top section */}
            <div className='row m-0 p-0'>
              <div id='threads-top' className='col-12 p-0 m-0'>
                <div className='row'>
                  <div
                    id='threads-page-title'
                    className='col-12 text-center pt5'
                  >
                    <h2 id='my-threads-h2'>(Thread title)</h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button
                      id='new-thread-btn'
                      onClick={() => setReviewModalTog(true)}
                    >
                      New Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
          </div>
        </div>
        {/* 2nd section */}
        <div className='row'>
          <div id='thread-container' className='col-12'>
            <div className='row'>
              {/* thread 1 */}
              {/* {userData.data.map((res) => {
                <UserThreads props={res} handlereviewModalTog={handlereviewModalTog} />
              })} */}
              {/* end thread 1 */}
            </div>
          </div>
        </div>

        {/* {modalTog && (
          <ThreadsModal closeModal={closeModal} modalTog={modalTog} />
        )} */}
        {reviewModalTog && (
          <ThreadAddReviewModal
            closeReviewModal={closeReviewModal}
            reviewModalTog={reviewModalTog}
          />
        )}
      </div>
    </>
  );
}
