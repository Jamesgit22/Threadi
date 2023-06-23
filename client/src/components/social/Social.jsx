import React from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_THREADS } from '../../utils/queries';
import { SAVE_THREAD } from '../../utils/mutations';
import { GET_COMMENT} from '../../utils/queries';
import './Social.css';
import Loading from '../loading/Loading';

export default function Social() {
  const { loading, error, data } = useQuery(GET_THREADS);
  const [saveThread] = useMutation(SAVE_THREAD);
  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const threads = data?.threads || [];
  const handleSaveThread = async (threadId) => {
    try {
      const { data } = await saveThread({
        variables: { threadId },
      });

      // Additional logic if needed

      console.log(data); // Optional: Log the response data
    } catch (error) {
      console.error(error);
    }
  };

// Go to comments page for seleted item
  const handleCommentBtn = (e) => {
    

  }

  const formatTimestamp = (timestamp) => {
    let date = timestamp.split(' ');
    return date[1] + ' ' + date[2] + ' ' + date[3];
  };

  return (
    <>
      <div
        id='social-main'
        className='container-fluid d-flex p-0 m-0 justify-content-center'
      >
        <div className='col-12'>
          <div
            id='social-container2'
            className='container-fluid justify-content-center'
          >
            <div id='social-background'>
              <div id='social-overlay' className='row justify-content-center'>
                {/* section */}
                <div id='social-title-container' className='col-12'>
                  <div className='row'>
                    <div className='col-12 text-center'>
                      <h2 id='social-title'>Recent Activity</h2>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 text-center'>
                    <p id='social-msg'>
                      Explore and stay up to date<br></br>with your{' '}
                      <span id='social-friends'>FRIENDS</span> and the content
                      <br></br> they love
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end section */}
            {/* section feed */}
            <div className='row p-0 justify-content-center'>
              {threads.map(
                (thread) => (
                  console.log(thread._id),
                  (
                    <div
                      key={thread._id}
                      id='feed-container'
                      className='col-11 col-md-8 mb-3'
                    >
                      <div className='row p-0'>
                        <div className='col-12 feed-username d-flex align-items-center'>
                          <div className='col-11'>
                            <p className='social-username m-0 p-1'>
                              A {thread.__typename} by {thread.author.username}
                            </p>
                          </div>
                          <div className='col-1 d-flex align-items-center justify-content-center'>
                            <p className='likes-count'>{0}</p>
                            <img
                              className='like-btn'
                              src='/images/thumbs-up-regular.svg'
                              alt='like button'

                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12 d-flex pt-2 justify-content-between align-items-center'>
                          <p>{thread.title}</p>
                          <p>{formatTimestamp(thread.timestamp)}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12 content-container'>
                          <p className='content-desc'>{thread.description}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-11'>
                          <button
                            className='social-btns'
                            onClick={() => handleSaveThread(thread._id)}
                          >
                            save
                          </button>
                        </div>
                        <div className='col-1 d-flex align-items-center'>
                          <p className='comments-count p-2'>{0}</p>
                          <img
                            className='comments-btn'
                            src='/images/comments-regular.svg'
                            alt='comment button'
                            onClick={handleCommentBtn}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
