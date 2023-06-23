import React from 'react'
import './Following.css'
import FollowingCard from './followingcard/FollowingCard'

export default function Following({userData}) {
  return (
    <div id='following-container' className="container-fluid">
      <div className="col-12">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="row">
              <div className="col-12 text-center">
                <h2 id="following-h2">Following <span id='following-count'>{0}</span></h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10 text-center">
                <FollowingCard userData={userData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
