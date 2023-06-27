import React from 'react';
import './ThreadComment.css';
import CommentCard from '../../cards/commentcard/CommentCard';
import { motion } from 'framer-motion';

export default function ThreadComment() {
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
                      id='my-comments-h2'
                      initial={{ opacity: 0, y: '20px' }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      Thread Comments
                    </motion.h2>
                  </div>
                </div>
                {/* New Comment Button */}
                <div className='row justify-content-center'>
                  <div className='col-8 mb-3 text-center'>
                    <motion.button
                      id='new-coms-btn'
                      onClick={''}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      New Comment
                    </motion.button>
                  </div>
                </div>
                {/* OG Comment */}
                <CommentCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
