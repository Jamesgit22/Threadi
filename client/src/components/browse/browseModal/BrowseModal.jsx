import React from 'react';
import { motion } from 'framer-motion';
import BModalCard from '../bmodalcard/BModalCard';

export default function BrowseModal({ closeModal, modalTog, searchResults }) {
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
                {searchResults.map((result) => (
                  <BModalCard
                    key={result.uuid}
                    image={result.image}
                    title={result.title}
                    releaseDate={result.releaseDate}
                    backDrop={result.backDrop}
                    author={result.author}
                    description={result.description}
                    type={result.type}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
