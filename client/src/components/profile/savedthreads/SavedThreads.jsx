import React from 'react'
import ThreadCard from '../../cards/threadcard/ThreadCard'

export default function SavedThreads({ userData, handleDelete }) {
  return (
    <div className='row pt-5 justify-content-center'>
            <div id='threads-container' className='col-11'>
              <ul>
                {userData.savedThreads ? (
                  userData.savedThreads.map((thread) => (
                    <ThreadCard
                      key={thread._id}
                      id={thread._id}
                      title={thread.title}
                      date={thread.timestamp}
                      description={thread.description}
                    />
                  ))
                ) : (
                  <p>Loading saved threads...</p>
                )}
              </ul>
            </div>
          </div>
  )
}
