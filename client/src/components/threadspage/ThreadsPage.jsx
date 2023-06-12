import React from 'react';
import { useState } from 'react';
import './ThreadsPage.css';
// import { useMutation } from '@apollo/client';
// import { ADD_THREAD } from '../../utils/mutations';
// import ThreadAddReviewModal from './threadsaddreviewmodal/ThreadAddReviewModal';
import { useQuery } from '@apollo/client';
import { USER_THREADS } from '../../utils/queries';
// import UserThreads from './userthreads/UserThreads';
import MainThreads from './mainthreads/MainThreads';
import SingleThreadPage from './mainthreads/SingleThreadPage';
import WriteReview from './writereview/WriteReview';

export default function ThreadsPage() {
  const [currentView, setCurrentView] = useState('main');
  const [currentThread, setCurrentThread] = useState({});
  const [chosenMedia, setChosenMedia] = useState({});
  // const [modalTog, setModalTog] = useState(false);
  // const [reviewModalTog, setreviewModalTog] = useState(false);
  // const [addThread, { error }] = useMutation(ADD_THREAD);
  const { loading, data } = useQuery(USER_THREADS);
  const userData = data?.userThreads || {};

  const getSingleThread = (threadID) => {
    userData.forEach((thread) => {
      console.log(thread._id, threadID);
      if (thread._id === threadID) {
        setCurrentThread(thread);
      }
    });
    
    setCurrentView('single');
  };
  const getWriteReview = (media) => {
    setChosenMedia(media);
    setCurrentView('write');
  };

  const getMainThread = () => {
    setCurrentView('main');
  }

  if (loading) return <h2>LOADING...</h2>;

  
  const switchView = () => {
    if (currentView === 'main') {
      return (
        <MainThreads getSingleThread={getSingleThread} userData={userData} />
      );
    }
    if (currentView === 'single') {
      return (
        <SingleThreadPage getWriteReview={getWriteReview} threadData={currentThread} />
      );
    }
    if (currentView === 'write') {
      return <WriteReview media={chosenMedia} getMainThread={getMainThread}/>;
    }
  };

  return <>{switchView()}</>;
}
