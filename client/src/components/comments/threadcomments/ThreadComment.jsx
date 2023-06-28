import React, { useState } from 'react';
import '../CommentsPage.css';
import ThreadCard from '../../cards/threadcard/ThreadCard';
import ComCard from '../../cards/commentcard/CommentCard';
import { GET_THREAD } from '../../../utils/queries';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import './ThreadComment.css';
import Loading from '../../loading/Loading';
import CommentModal from '../../cards/newcommentmodal/CommentModal';

export default function ThreadComment() {
  let { id } = useParams();
  const { loading, data, error } = useQuery(GET_THREAD, {
    variables: { threadId: id },
  });
  const [modalTog, setModalTog] = useState(false);

  const threadData = data?.singleThread || {};

  if (loading) {
    return <Loading />;
  }

  const handleModalTog = () => {
    setModalTog((open) => !open);
  };

  const closeModal = () => {
    setModalTog(false);
  };

  console.log('threadData:', threadData)
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
                    <ThreadCard
                      key={threadData._id}
                      id={threadData._id}
                      title={threadData.title}
                      date={threadData.timestamp}
                      description={threadData.description}
                    />

                    <div className='row justify-content-center'>
                      <div className='col-6 text-center'>
                        <button id='create-comment-btn' onClick={() => handleModalTog()}>New Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
            {threadData.coms.map((res) => (
              <ComCard
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
            threadId={threadData._id}
            threadAuthor={threadData.author._id}
          />
        )}
      </div>
    </>
  );
}
