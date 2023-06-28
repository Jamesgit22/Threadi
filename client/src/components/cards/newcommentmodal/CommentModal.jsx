import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@apollo/client';
import { ADD_THREAD_COM } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

export default function CommentModal({ modalTog, closeModal, threadId, threadAuthor}) {
    const [addComment, {error}] = useMutation(ADD_THREAD_COM);
    const [userFormData, setUserFormData] = useState({ comText: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        
      };    
    
    async function handleFormSubmit(e) {
        e.preventDefault();
    
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token || !userFormData) {
          return false;
        }
    
        try {
            console.log({ ...userFormData });
            console.log( threadId);
            addComment({ variables: {threadId: threadId, ...userFormData, comAuthor: threadAuthor} })
            .then((res) => {
              if (res.data.addThread) {
                console.log('Comment added successfully: ');
                window.location.reload(false);
              } else {
                console.error("Failed to add Comment: " + res.data);
              }
              window.location.reload(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
    

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='backdrop'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`container-fluid ${modalTog ? 'open' : ''}`}
          id='modal-component'
        >
          <div className='row'>
            <div className='col-12' id='thread-modal'>
              <div className='row'>
                <div
                  className='col-12 d-flex justify-content-center text-center'
                  id='modal-title'
                >
                  <h2 className='modal-title'>
                    New <span>Comment</span>
                  </h2>
                  <button id='modal-close' onClick={closeModal}>
                    <img src='./images/circle-xmark-regular.svg' alt='' />
                  </button>
                </div>
              </div>
              {/* Form */}
              <div className='row justify-content-center'>
                <div className='col-11 item-container'>
                  <form>
                    <div className='row pt-3'>
                      <div className='col-12'>
                        <div className='row'>
                          <div className='col-12 text-center'>
                            <textarea
                              name='comText'
                              id='new-desc'
                              value={userFormData.comText}
                              onChange={handleInputChange}
                              placeholder='Your text here'
                              cols='40'
                              rows='5'
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12 text-center mb-2'>
                        <button
                          id='create-submit-btn'
                          type='button'
                          disabled={!userFormData.comText}
                          onClick={handleFormSubmit}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}