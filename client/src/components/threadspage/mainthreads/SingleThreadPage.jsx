import React from 'react'
// import ThreadsModal from '../threadsModal/ThreadsModal';
import { useState, useEffect } from 'react';
import '../ThreadsPage.css';
import { useMutation } from '@apollo/client';
import { ADD_THREAD } from '../../../utils/mutations';
import ThreadAddReviewModal from '../threadsaddreviewmodal/ThreadAddReviewModal';
import { useQuery } from '@apollo/client';
import { SINGLE_THREAD, THREAD_REVIEWS } from '../../../utils/queries';
// import UserThreads from '../userthreads/UserThreads';
// import MainThreads from '../mainthreads/MainThreads';

export default function SingleThreadPage({ threadData, getWriteReview }) {

const [currentView, setCurrentView] = useState('main');
  const [reviewModalTog, setReviewModalTog] = useState(false);
  const [addThread, { error }] = useMutation(ADD_THREAD);

  const { loading, data } = useQuery(THREAD_REVIEWS, {
    variables: {threadId: threadData._id}
  });
  console.log(data);
  console.log(data?.getReviewsByThread?.reviews)
  if (loading) {
    return <p>loading...</p>
  }
  const userData = data?.getReviewsByThread?.reviews;
  // console.log('threadData');
  // console.log(threadData);
console.log(userData);
  const formatTimestamp = (timestamp) => {
    let date = timestamp.split(' ');
    return (date[1] + ' ' + date[2] + ' ' + date[3]);
  }


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
              {userData.map((thread) => (
                console.log(thread._id),
                <div key={thread._id} id='feed-container' className='col-11 mb-3'>
                  <div className='row p-0'>
                    <div className='col-12 feed-username d-flex justify-content-between align-items-center'>
                      <p className='social-username m-0 p-1'>{thread.title}</p>
                      <img className='like-btn' src="/images/thumbs-up-regular.svg" alt="" />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 d-flex pt-2 justify-content-between align-items-center'>
                      <p>{formatTimestamp(thread.date)}</p>
                      <p>{thread.rating}</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 content-container'>
                      <p className='content-desc'>{thread.text}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className='social-btns'>delete</button>
                    </div>
                  </div>
                </div>
              ))}
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
  )
}


// {reviewModalTog && (
//     <ThreadAddReviewModal
//       closeReviewModal={closeReviewModal}
//       reviewModalTog={reviewModalTog}
//     />
//   )}