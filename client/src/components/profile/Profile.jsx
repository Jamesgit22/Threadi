import React from 'react';
import './Profile.css';
import ProfileComments from '../profilecomments/ProfileComments.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams();
  return (
    <>
      <div id='profile-parent' className='container-fluid'>
        <div id='profile-container'>
          {/* section */}
          <div className='row'>
            <div id='profile-card' className='col-12'>
              <div className='row justify-content-center align-items-center'>
                <div
                  id='profile-img-container'
                  className='col-10 pt-5 pb-5 text-center'
                >
                  <FontAwesomeIcon id='profile-default' icon={faCircleUser} style={{color: "#393939",}}></FontAwesomeIcon>
                </div>
              </div>
              <div className='row'>
                <div
                  id='username-container'
                  className='col-12 pt-2 pb-3 text-center'
                >
                  <h3>{username}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* section end */}
          {/* section */}
          <div className='row pt-5 justify-content-center'>
            <div id='menu-container' className='col-11'>
              <div className='row'>
                <div id='menu-s-threads' className='col-12'>
                  <p className='menu-btns p-1 m-0'>Saved Threads</p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-comments' className='col-12'>
                  <p className='menu-btns p-1 m-0'>Comments</p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-friends' className='col-12'>
                  <p className='menu-btns p-1 m-0'>Friends</p>
                </div>
              </div>
            </div>
          </div>
          {/* section end */}
          {/* section */}
          <div className='row pt-5 justify-content-center'>
            <div id='threads-container' className='col-11'>
              <ul>
                <div className='d-flex'>
                  <div className='col-1'>
                    <div className='row'>
                      <div className='col-12 gold-border'></div>
                    </div>
                    <div className='row'>
                      <div className='col-12'></div>
                    </div>
                  </div>
                  <li className='row mb-3'>
                    <div className='col-11 li-thread '>
                      <div className='row '>
                        <div className='col-6'>
                          <div className='row'>
                            <h4 className='thread-title'>Thread Title</h4>
                          </div>
                          <div className='row'>
                            <p className='thread-p'>
                              Description Lorem ipsum dolor sit amet consectetur
                              adipisicing elit.{' '}
                            </p>
                          </div>
                        </div>
                        <div className='col-6 thread-img-container'>
                          <img
                            className='thread-img'
                            src='/images/pexels-tima-miroshnichenko-7991579.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          {/* section end */}
        </div>
      </div>
    </>
  );
}

export default Profile;
