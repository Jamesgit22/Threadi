import React, { useState } from 'react';
import '../CommentsPage.css';
import ReviewCard from '../../cards/reviewcard/ReviewCard';
import ComCard from '../../cards/commentcard/CommentCard';
import { GET_REVIEW } from '../../../utils/queries';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import Loading from '../../loading/Loading';
import CommentModal from '../../cards/newcommentmodal/CommentModal';

export default function ReviewComment() {
  let { id } = useParams();
  const { loading, data, error } = useQuery(GET_REVIEW, {
    variables: { reviewId: id }
  })

  if(error) {console.log(error)};
  const [modalTog, setModalTog] = useState(false);


  if (loading) {return <Loading />}
  console.log(data);
  const reviewData = data?.singleReview || {};

  const handleModalTog = () => {
    setModalTog((open) => !open);
  };

  const closeModal = () => {
    setModalTog(false);
  };

  return (
    <>
      <div id='comments-main' className='container-fluid p-0 m-0'>
        <div id='comments-background'>
          <div id='comments-overlay'>
            {/* top section */}
            <div className='row m-0 p-0'>
              <div id='comments-top' className='col-12 p-0 m-0'>
                <div className='row'>
                  <div
                    id='comments-page-title'
                    className='col-12 text-center pt5'
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: '20px' }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      id='my-comments-h2'
                    >
                      <ReviewCard
                        key={reviewData._id}
                        id={reviewData._id}
                        title={reviewData.title}
                        image={reviewData.image}
                        date={reviewData.date}
                        rating={reviewData.rating}
                        text={reviewData.text}
                      />
                    </motion.h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-6 text-center'>
                  <button id='create-comment-btn' onClick={() => handleModalTog()}>New Comment</button>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
            {reviewData.coms.map((res) => (
              <ComCard 
                key={res._id}
                id={res._id}
                author={res.author}
                likes={res.likes}
                text={res.text}
                timestamp={res.timestamp}
              />
            ))}
          </div>
        </div>
        {modalTog && (
          <CommentModal
            closeModal={closeModal}
            //onViewChange={onViewChange}
            modalTog={modalTog}
          />
        )}
      </div>
    </>
  );
}
