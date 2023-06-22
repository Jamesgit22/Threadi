import React from 'react';
import './Profile.css';
import ProfileComments from '../profilecomments/ProfileComments.jsx';
import '../cards/threadcard/cardtheme/ProfileTheme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, GET_USER } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { DELETE_SAVED_THREAD } from '../../utils/mutations';
import ThreadCard from '../cards/threadcard/ThreadCard';
import {delay, motion} from 'framer-motion';

function Profile() {
  let { username } = useParams();
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { username: username }
  });
  const userData = data?.getProfile || {};
  const [deleteSavedThread] = useMutation(DELETE_SAVED_THREAD);

  if (loading) {
    return <p>...loading</p>
  };

  const handleDelete = async (threadId) => {
    try {
      await deleteSavedThread({
        variables: { threadId },
      });

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

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
                  <FontAwesomeIcon id='profile-default' icon={faCircleUser} style={{ color: "#393939", }}></FontAwesomeIcon>
                </div>
              </div>
              <div className='row'>
                <div
                  id='username-container'
                  className='col-12 pt-2 pb-3 text-center'
                >
                  <motion.h3
                  initial={{opacity: 0, y: '30px'}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8,delay: 0.6}}
                  >{userData.username}</motion.h3>
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
                  <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.2, delay: 0.1}}
                  className='menu-btns p-1 m-0'>Saved Threads</motion.p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-comments' className='col-12'>
                  <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.2, delay: 0.3}}
                  className='menu-btns p-1 m-0'>Comments</motion.p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-friends' className='col-12'>
                  <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.2, delay: 0.5}}
                  className='menu-btns p-1 m-0'>Friends</motion.p>
                </div>
              </div>
            </div>
          </div>
          {/* section end */}
          {/* section */}
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
          {/* section end */}
        </div>
      </div>
    </>
  );
}

export default Profile;
