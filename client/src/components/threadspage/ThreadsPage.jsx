import React from 'react';
import { useState } from 'react';
import './ThreadsPage.css';
import ThreadsModal from './threadsModal/ThreadsModal';

export default function ThreadsPage() {
  const [modalTog, setModalTog] = useState('false')

  const handleModalTog = () => {
    setModalTog((open) => !open);
  };

  const closeModal = () => {
    setModalTog(false);
  }

  return (
    <>
      <div id='threads-main' className='container-fluid p-0 m-0'>
        <div id='thread-background'>
          <div id='threads-overlay'>
            {/* top section */}
            <div className='row m-0 p-0'>
              <div id='threads-top' className='col-12 p-0 m-0'>
                <div className='row'>
                  <div
                    id='threads-page-title'
                    className='col-12 text-center pt5'
                  >
                    <h2 id='my-threads-h2'>My Threads</h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button id='new-thread-btn'>New Thread</button>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
          </div>
        </div>
        {/* 2nd section */}
        <div className='row'>
          <div id='thread-container' className='col-12'>
            <div className='row'>
              {/* thread 1 */}
              <div className='col-11 thread-card'>
                <div className='row'>
                  <div className='col-12 thread-title-sec d-flex justify-content-between align-content-center'>
                    <h3 className='thread-card-title m-0'>title</h3>
                    <p className='m-0'>(date)</p>
                  </div>
                </div>
                {/* content row */}
                <div className='row'>
                  <div id='box-container' className='col-12 d-flex '>
                    {/* scroll row */}
                    <div className='col-12 threads-box p-0'>
                      <div className='row'>
                        <div className='col-4'>
                          <h4 className='item-titles'>item Title</h4>
                        </div>
                        <div className='col-8 p-0 m-0'>
                          <img
                            className='threads-imgs'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                    {/* scroll row end */}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 d-flex justify-content-evenly align-items-center thread-btns-container'>
                    <p className='m-0 pt-1 pb-1'>(edit)</p>
                    <button className='thread-open-btn' onClick={() => handleModalTog(true)}>Open</button>
                    <p className='m-0 pt-1 pb-1'>(delete)</p>
                  </div>
                </div>
                {/* end */}
              </div>
              {/* end thread 1 */}
              {/* thread 2 */}
              <div className='col-11 thread-card'>
                <div className='row'>
                  <div className='col-12 thread-title-sec d-flex justify-content-between align-content-center'>
                    <h3 className='thread-card-title m-0'>title</h3>
                    <p className='m-0'>(date)</p>
                  </div>
                </div>
                {/* content row */}
                <div className='row'>
                  <div id='box-container' className='col-12 d-flex '>
                    {/* scroll row */}
                    <div className='col-12 box'>
                      <div className='row'>
                        <div className='col-4'>
                          <h4 className='item-titles'>item Title</h4>
                        </div>
                        <div className='col-8'>
                          <img
                            className='threads-imgs'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                    {/* scroll row end */}
                    <div className='col-12 box'>
                      <div className='row'>
                        <div className='col-4'>
                          <h4 className='item-titles'>item Title</h4>
                        </div>
                        <div className='col-8'>
                          <img
                            className='threads-imgs'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 d-flex justify-content-evenly align-items-center thread-btns-container'>
                    <p className='m-0 pt-1 pb-1'>(edit)</p>
                    <button className='thread-open-btn'>Open</button>
                    <p className='m-0 pt-1 pb-1'>(delete)</p>
                  </div>
                </div>
                {/* end */}
              </div>
              {/* end thread 2 */}
              {/* thread 3 */}
              <div className='col-11 thread-card'>
                <div className='row'>
                  <div className='col-12 thread-title-sec d-flex justify-content-between align-content-center'>
                    <h3 className='thread-card-title m-0'>title</h3>
                    <p className='m-0'>(date)</p>
                  </div>
                </div>
                {/* content row */}
                <div className='row'>
                  <div id='box-container' className='col-12 d-flex '>
                    {/* scroll row */}
                    <div className='col-12 box'>
                      <div className='row'>
                        <div className='col-4'>
                          <h4 className='item-titles'>item Title</h4>
                        </div>
                        <div className='col-8'>
                          <img
                            className='threads-imgs'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                    {/* scroll row end */}
                    <div className='col-12 box'>
                      <div className='row'>
                        <div className='col-4'>
                          <h4 className='item-titles'>item Title</h4>
                        </div>
                        <div className='col-8'>
                          <img
                            className='threads-imgs'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 d-flex justify-content-evenly align-items-center thread-btns-container'>
                    <p className='m-0 pt-1 pb-1'>(edit)</p>
                    <button className='thread-open-btn'>Open</button>
                    <p className='m-0 pt-1 pb-1'>(delete)</p>
                  </div>
                </div>
                {/* end */}
              </div>
              {/* end thread 3 */}
            </div>
          </div>
        </div>

        {modalTog && <ThreadsModal closeModal={closeModal} modalTog={modalTog}/>}

      </div>
    </>
  );
}
