import React from 'react';
import { useState } from 'react';
import './ThreadsModal.css';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { ADD_THREAD } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

export default function ThreadsModal({ closeModal, modalTog }) {
  const [addThread, { error }] = useMutation(ADD_THREAD);
  const [userFormData, setUserFormData] = useState({ title: '', desc: '' });

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
      const { data } = await addThread({ variables: { ...userFormData } });
      console.log(data);

      setUserFormData({ title: '', desc: '' });
      // window.location.reload(false);
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
                    Create a <span>NEW</span> Thread
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
                    <div className='row'>
                      <div className='col-12 p-0'>
                        <input
                          type='text'
                          name='title'
                          id='new-title'
                          value={userFormData.title}
                          onChange={handleInputChange}
                          placeholder='New thread title'
                          required
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <div className='row'>
                          <div className='col-12 text-center'>
                            <textarea
                              name='desc'
                              id='new-desc'
                              value={userFormData.desc}
                              onChange={handleInputChange}
                              placeholder='Description'
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
                          disabled={!userFormData.title}
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
  );
}
