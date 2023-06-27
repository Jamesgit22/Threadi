import React, { useEffect, useState } from 'react';
import './Profile.css';
import ProfileComments from '../profilecomments/ProfileComments.jsx';
import '../cards/threadcard/cardtheme/ProfileTheme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE, CHECK_FOLLOWERS } from '../../utils/queries';
import { DELETE_SAVED_THREAD, ADD_FRIEND, UNFOLLOW_USER } from '../../utils/mutations';
import ThreadCard from '../cards/threadcard/ThreadCard';
import { motion } from 'framer-motion';
import Loading from '../loading/Loading';
import SavedThreads from './savedthreads/SavedThreads';
import Following from './following/Following';
import Auth from '../../utils/auth';

function Profile() {
  const { username } = useParams();
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { username: username },
  });
  const userData = data?.getProfile || {};
  const [deleteSavedThread] = useMutation(DELETE_SAVED_THREAD);
  const [currentScreen, setCurrentScreen] = useState('threads');
  const [followBtnText, setFollowBtnText] = useState('Follow');
  const [addFriend] = useMutation(ADD_FRIEND);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const {
    data: followersData,
    loading: followersLoading,
    error: followersError,
  } = useQuery(CHECK_FOLLOWERS, {
    variables: { followId: userData._id },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await Auth.getProfile();
      setCurrentUser(profile);
    };

    fetchProfile();
  }, []);

  const checkData = followersData?.checkFollowers;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (checkData) {
      setFollowBtnText('Unfollow');
    } else {
      setFollowBtnText('Follow');
    }
  }, [checkData]);

  const handleFollowBtn = async () => {
    try {
      if (!checkData) {
        await addFriend({ variables: { userId: userData._id } });
      } else {
        await unfollowUser({ variables: { userId: userData._id } });
      }

      // Toggle the follow button text
      setFollowBtnText(checkData ? 'Follow' : 'Unfollow');
    } catch (err) {
      console.error('There was an error changing the follow button:', err);
    }
  };

  const handleDelete = async (threadId) => {
    try {
      await deleteSavedThread({ variables: { threadId } });

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const isSameUser = currentUser && currentUser.data._id === userData._id;

  const handleMenuSwitch = (e) => setCurrentScreen(e);

  const renderSwitch = (currentScreen) => {
    switch (currentScreen) {
      case 'threads':
        return <SavedThreads userData={userData} handleDelete={handleDelete} />;
      case 'comments':

        return <ProfileComments />;
      case 'following':
        return (
          <Following
            followList={userData.following}
            key={userData._id}
            id={userData._id}
          />
        );

      default:
        return <SavedThreads />;
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
                  <FontAwesomeIcon
                    id='profile-default'
                    icon={faCircleUser}
                    style={{ color: '#393939' }}
                  ></FontAwesomeIcon>
                </div>
              </div>
              <div className='row'>
                <div
                  id='username-container'
                  className='col-12 pt-2 pb-3 text-center'
                >
                  <motion.h3
                    initial={{ opacity: 0, y: '30px' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {userData.username}
                  </motion.h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-center'>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                    id='following-btn'
                    className={`${isSameUser ? 'same' : ''}`}
                    data-text={`${followBtnText}`}
                    onClick={handleFollowBtn}
                  >
                    {followBtnText}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          {/* section end */}
          {/* section */}
          <div className='row pt-5 justify-content-center'>
            <div id='menu-container' className='col-11 mb-5'>
              <div className='row'>
                <div id='menu-s-threads' className='col-12'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    onClick={() => handleMenuSwitch('threads')}
                    className='menu-btns p-1 m-0'
                  >
                    Saved Threads
                  </motion.p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-comments' className='col-12'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    onClick={() => handleMenuSwitch('comments')}
                    className='menu-btns p-1 m-0'
                  >
                    Comments
                  </motion.p>
                </div>
              </div>
              <div className='row'>
                <div id='menu-friends' className='col-12'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    onClick={() => handleMenuSwitch('following')}
                    className='menu-btns p-1 m-0'
                  >
                    Following
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
          {/* section end */}
          {/* section */}
          {renderSwitch(currentScreen)}
          {/* section end */}
        </div>
      </div>
    </>
  );
}

export default Profile;
