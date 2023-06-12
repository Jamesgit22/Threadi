import React from 'react'
import ThreadsModal from '../threadsModal/ThreadsModal';
import { useState } from 'react';
import '../ThreadsPage.css';
import { useMutation } from '@apollo/client';
import { ADD_THREAD } from '../../../utils/mutations';
// import ThreadAddReviewModal from './threadsaddreviewmodal/ThreadAddReviewModal';
import { useQuery } from '@apollo/client';
import { USER_THREADS } from '../../../utils/queries';
import UserThreads from '../userthreads/UserThreads';
// import SingleThreadPage from './mainthreads/SingleThreadPage';


export default function MainThreads({ onViewChange }) {
    const [modalTog, setModalTog] = useState(false);
    // const [currentView, setCurrentView] = useState('main');
    // const [reviewModalTog, setreviewModalTog] = useState(false);
    const [addThread, { error }] = useMutation(ADD_THREAD);
    const { loading, data } = useQuery(USER_THREADS);
    const userData = data?.userThreads || {};
    console.log('log me');
    console.log(data);
  
    if (loading) return <h2>LOADING...</h2>;
    if (error) return `Error! ${error.message}`;
  
    const handleModalTog = () => {
      setModalTog((open) => !open);
    };
  
  
    const closeModal = () => {
      setModalTog(false);
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
                    <h2 id='my-threads-h2'>My Threads</h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button
                      id='new-thread-btn'
                      onClick={() => handleModalTog()}
                    >
                      New Thread
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
              {userData.map((res) => (
                <UserThreads
                  key={res._id}
                  title={res.title}
                  date={res.timestamp}
                  onViewChange={onViewChange}
                />
              ))}

              {/* end thread 1 */}
            </div>
          </div>
        </div>

        {modalTog && (
          <ThreadsModal closeModal={closeModal} onViewChange={onViewChange} modalTog={modalTog} />
        )}
        {/* {reviewModalTog && (
          <ThreadAddReviewModal
            closeReviewModal={closeReviewModal}
            reviewModalTog={reviewModalTog}
          />
        )} */}
      </div>
    </>
  )
}