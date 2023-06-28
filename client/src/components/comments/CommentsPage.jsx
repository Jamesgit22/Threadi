import React from 'react';
import './CommentsPage.css';
// import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
// import { useLazyQuery } from '@apollo/client';
// import { useState, useEffect } from 'react';
// import { GET_THREAD, GET_REVIEW, GET_COMMENT } from '../../utils/queries';
import ThreadComment from './threadcomments/ThreadComment';
import ReviewComment from './reviewcomments/ReviewComment';
// import ComComment from './comcomments/ComComment';

export default function CommentsPage() {
  let { type } = useParams();
  let parent;

  switch (type) {
    case 'thread': {
      parent = <ThreadComment />
      break;
    }
    case 'review': {
      parent = <ReviewComment />
      break;
    }
    case 'comment': {

      break;
    }
  }

  console.log(parent);

  return (
    <>
      {parent}
    </>
  );
}
