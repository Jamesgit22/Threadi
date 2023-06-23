import React from 'react'

export default function FollowingCard({userData}) {
  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="row justify-content-cneter">
          <div className="col-11">
            <div className="row">
              <div className="col-12">
                <p id="follow-username">{userData.following[0].username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
