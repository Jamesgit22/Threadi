import React from 'react'
import ThreadsModal from './threadsModal/ThreadsModal';
import { useState, useEffect } from 'react';
import './ThreadsPage.css';
import { useMutation } from '@apollo/client';
import { ADD_THREAD } from '../../utils/mutations';
import ThreadAddReviewModal from './threadsaddreviewmodal/ThreadAddReviewModal';
import { useQuery } from '@apollo/client';
import { USER_THREADS } from '../../utils/queries';
import UserThreads from './userthreads/UserThreads';
import MainThreads from './mainthreads/MainThreads';

export default function SingleThreadPage() {

const [currentView, setCurrentView] = useState('main');
  const [reviewModalTog, setreviewModalTog] = useState(false);
  const [addThread, { error }] = useMutation(ADD_THREAD);
  const { loading, data } = useQuery(USER_THREADS);
  const userData = data?.userThreads || {};
  console.log('log me');
  console.log(data);

  if (loading) return <h2>LOADING...</h2>;
  if (error) return `Error! ${error.message}`;

  const handlereviewModalTog = () => {
    setreviewModalTog((open) => !open);
  };


  const closeReviewModal = () => {
    setreviewModalTog(false);
  };
  return (
    <>
    
    </>
  )
}


// {reviewModalTog && (
//     <ThreadAddReviewModal
//       closeReviewModal={closeReviewModal}
//       reviewModalTog={reviewModalTog}
//     />
//   )}