import React from 'react';
import './Activityitem.css'
import { useMutation } from '@apollo/client';
import { SAVE_THREAD } from '../../utils/mutations';

export default function ActivityItem(props, { handleReviewModalTog }) {
   
      const date = props.date.split(' ');
      const fDate = date[1] + ' ' + date[2] + ' ' + date[3];
      
      const {  title, author } = props;
      const username = author ? author.username : '';

      console.log(props.id);

      const [saveThread] = useMutation(SAVE_THREAD);

      const handleSaveThread = async () => {
        try {
          const threadId = props.id; // Declare the threadId variable here
          const { data } = await saveThread({
            variables: { threadId },
          });
    
          // Additional logic if needed
    
          console.log(data); // Optional: Log the response data
        } catch (error) {
          console.error(error);
        }
      };
      


  return (
    <>
      <div className='col-11 thread-card'>
        <div className='row'>
          <div className='col-12 thread-title-sec d-flex justify-content-between align-content-center'>
            <h3 className='thread-card-title m-0'>{props.title}</h3>
            <h2>Created By: {username}</h2>
            <p className='m-0'>{fDate}</p>
          </div>
        </div>
        {/* content row */}
        <div className='row'>
          <div id='box-container' className='col-12 d-flex '>
            {/* scroll row */}
            <div className='col-12 threads-box p-0'>
              <div className='row'>
                <div className='col-4'>
                  <h4 className='item-titles' key={props.threadKey}></h4>
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
          <div className='col-12 justify-content-between d-flex align-items-center thread-btns-container'>
            <div className="col-6">
            <button
              className='thread-open-btn'
              onClick={() => handleReviewModalTog(true)}
            >
              Open
            </button>
            </div>
            <div className="col-6 text-end">
            <button className='thread-save-btn'
            onClick={handleSaveThread}>Save</button>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </>
  );
}