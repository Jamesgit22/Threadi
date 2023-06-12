import React from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_THREADS } from '../../utils/queries';
import { SAVE_THREAD } from '../../utils/mutations';
import './Social.css';

export default function Social() {
  const { loading, error, data } = useQuery(GET_THREADS);
  const [saveThread] = useMutation(SAVE_THREAD);
  if (loading) return <h2>LOADING...</h2>;
  if (error) return `Error! ${error.message}`;

  const threads = data?.threads || [];
  const handleSaveThread = async (threadId) => {
    try {
      const { data } = await saveThread({
        variables: { threadId }
      });

      // Additional logic if needed

      console.log(data); // Optional: Log the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id='social-main' className='container-fluid d-flex p-0 m-0 justify-content-center'>
        <div className='col-12'>
          <div id='social-container2' className='container-fluid justify-content-center'>
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
                      Explore and stay up to date<br></br>with your <span id='social-friends'>FRIENDS</span> the content<br></br> they love
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end section */}
            {/* section feed */}
            <div className='row p-0 justify-content-center'>
              {threads.map((thread) => (
                console.log(thread._id),
                <div key={thread._id} id='feed-container' className='col-11 mb-3'>
                  <div className='row p-0'>
                    <div className='col-12 feed-username d-flex justify-content-between align-items-center'>
                      <p className='social-username m-0 p-1'>{thread.author.username}</p>
                      <img className='like-btn' src="/images/thumbs-up-regular.svg" alt="" />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 d-flex pt-2 justify-content-between align-items-center'>
                      <p>{thread.title}</p>
                      <p>{thread.timestamp}</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 content-container'>
                      <p className='content-desc'>{thread.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className='social-btns'>comment</button>
                      <button className='social-btns' onClick={() => handleSaveThread(thread._id)}>save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
