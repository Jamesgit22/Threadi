import React from 'react';
import { motion } from 'framer-motion';

export default function BrowseModal(closeModal, modalTog) {
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
                  <h2 className='modal-title'>(thread title)</h2>
                  <button id='modal-close' onClick={closeModal}>
                    <img src='./images/circle-xmark-regular.svg' alt='' />
                  </button>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className='col-11 item-container'>
                  <div className='row'>
                    <div className='col-12 p-0'>
                      <p className='item-title'>(item title)</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-6 item-img-container'>
                          <img className='item-img' src='' alt='' />
                        </div>
                        <div className='col-6'>
                          <div className='row'>
                            <div className='col-12'>
                              <p className='item-desc'>(item desc)</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12 text-end'>
                              <button className='item-btn'>Open</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
