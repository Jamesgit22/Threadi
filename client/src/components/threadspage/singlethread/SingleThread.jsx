import React from 'react';
import { useState } from 'react';
import ThreadAddReviewModal from '../threadsaddreviewmodal/ThreadAddReviewModal';
import { useQuery } from '@apollo/client';
import { THREAD_REVIEWS } from '../../utils/queries';

export default function SingleThread() {
  const [reviewModalTog, setReviewModalTog] = useState(false);
  const { loading, data } = useQuery(THREAD_REVIEWS);
  const userData = data?.userThreads || {};


  const closeReviewModal = () => {
    setReviewModalTog(false);
  };
  
  if (loading) return <h2>LOADING...</h2>;

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
              
              {/* end thread 1 */}
            </div>
          </div>
        </div>
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
