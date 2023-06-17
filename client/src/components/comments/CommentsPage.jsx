import React from 'react';
import './CommentsPage.css';

export default function commentsPage() {
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
                    <h2 id='my-comments-h2'>My comments</h2>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button
                      id='new-comments-btn'
                      
                    >
                      New comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* top section end */}
          </div>
        </div>
      </div>
    </>
  );
}
