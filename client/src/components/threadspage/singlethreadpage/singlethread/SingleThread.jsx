import React from 'react';
// import ThreadsModal from '../threadsModal/ThreadsModal';
import { useState, useEffect } from 'react';
import '../../ThreadsPage.css';
import '../../../cards/threadcard/cardtheme/NormalTheme.css'
import { useMutation } from '@apollo/client';
import { ADD_THREAD } from '../../../../utils/mutations';
import ThreadAddReviewModal from '../../threadsaddreviewmodal/ThreadAddReviewModal';
import ReviewCard from '../../../cards/reviewcard/ReviewCard';
import { useQuery } from '@apollo/client';
import { SINGLE_THREAD, THREAD_REVIEWS } from '../../../../utils/queries';
import './SingleThread.css';
// import UserThreads from '../userthreads/UserThreads';
// import MainThreads from '../mainthreads/MainThreads';

export default function SingleThreadPage({ threadData, getWriteReview }) {
  const [reviewModalTog, setReviewModalTog] = useState(false);

  const { loading, data } = useQuery(THREAD_REVIEWS, {
    variables: { threadId: threadData._id },
  });

  if (loading) {
    return <p>loading...</p>;
  }

  const userData = data?.getReviewsByThread?.reviews;
  console.log(userData);

  const closeReviewModal = () => {
    setReviewModalTog(false);
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
                    <h2 id='my-threads-h2'>{threadData.title}</h2>
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
            <div className='row p-0 justify-content-center'>
              {userData.map(
                (review) => (
                  console.log(review._id),
                  (
                    <ReviewCard 
                      key={review._id}
                      _id={review._id}
                      title={review.title}
                      image={review.image}
                      date={review.date}
                      rating={review.rating}
                      text={review.text}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
        {/* 2nd section */}
        <div className='row'>
          <div id='thread-container' className='col-12'>
            <div className='row'>
              {/* thread 1 */}
              {/* {threadData.map((res) => {
                <UserThreads props={res} handlereviewModalTog={handleReviewModalTog} />
              })}  */}
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
            threadData={threadData}
            getWriteReview={getWriteReview}
          />
        )}
      </div>
    </>
  );
}

// {reviewModalTog && (
//     <ThreadAddReviewModal
//       closeReviewModal={closeReviewModal}
//       reviewModalTog={reviewModalTog}
//     />
//   )}
