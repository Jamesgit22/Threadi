import React from 'react';
import { useState } from 'react';
import './ThreadsPage.css';
// import { useMutation } from '@apollo/client';
// import { ADD_THREAD } from '../../utils/mutations';
// import ThreadAddReviewModal from './threadsaddreviewmodal/ThreadAddReviewModal';
// import { useQuery } from '@apollo/client';
// import { USER_THREADS } from '../../utils/queries';
// import UserThreads from './userthreads/UserThreads';
import MainThreads from './mainthreads/MainThreads';
import SingleThreadPage from './mainthreads/SingleThreadPage';

export default function ThreadsPage() {

  const [currentView, setCurrentView] = useState('main');
  // const [modalTog, setModalTog] = useState(false);
  // const [reviewModalTog, setreviewModalTog] = useState(false);
  // const [addThread, { error }] = useMutation(ADD_THREAD);
  // const { loading, data } = useQuery(USER_THREADS);
  // const userData = data?.userThreads || {};
  // console.log('log me');
  // console.log(data);

  // if (loading) return <h2>LOADING...</h2>;
  // if (error) return `Error! ${error.message}`;

  // const handleModalTog = () => {
  //   setModalTog((open) => !open);
  // };

  // const handlereviewModalTog = () => {
  //   setreviewModalTog((open) => !open);
  // };

  // const closeModal = () => {
  //   setModalTog(false);
  // };

  // const closeReviewModal = () => {
  //   setreviewModalTog(false);
  // };
  const onViewChange = () => setCurrentView('single');

  const switchView = () => {
    if (currentView === 'main') {
      return <MainThreads onViewChange={onViewChange} />;
    }
    if (currentView === 'single') {
      return <SingleThreadPage />;
    }
}



  return <>{switchView()}</>;
};
