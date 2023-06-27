import React from 'react'
import CommentCard from '../../cards/commentcard/CommentCard';
import './ComComment.css'

export default function ComComment() {
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
                    <h2 id='my-comments-h2'>Comments</h2>
                  </div>
                </div>
                {/* New Comment Button */}
                <div className='row justify-content-center'>
                  <div className='col-8 text-center'>
                    <button id='new-coms-btn' onClick={''}>
                      New Comment
                    </button>
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

