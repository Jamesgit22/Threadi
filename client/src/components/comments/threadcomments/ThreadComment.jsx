import React from 'react';
import '../CommentsPage.css';
import ThreadCard from '../../cards/threadcard/ThreadCard';
import ComCard from '../../cards/commentcard/CommentCard';
import { GET_THREAD } from '../../../utils/queries';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';

export default function ThreadComment() {
  let { id } = useParams();
  const { loading, data, error } = useQuery(GET_THREAD, {
    variables: { threadId: id }
  })

  const threadData = data?.singleThread || {};

  if (loading) {return <>LOADING...</>}

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
                      <ThreadCard
                        key={threadData._id}
                        id={threadData._id}
                        title={threadData.title}
                        date={threadData.timestamp}
                        description={threadData.description}
                      />
                    </motion.h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button id='new-comments-btn'>New comments</button>
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
      </div>
    </>
  );
}
