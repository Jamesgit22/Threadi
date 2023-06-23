import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Profile from './profile/Profile';
import Home from './home/Home';
import Login from './login/Login';
import Browse from './browse/Browse';
import Social from './social/Social';
import ThreadsPage from './threadspage/ThreadsPage';
import CommentsPage from './comments/CommentsPage';
import SingleThreadPage from './threadspage/singlethreadpage/SingleThreadPage';
import Feed from './activityfeed/Feed';
import Loading from './loading/Loading'

// Define the page transition variants
const pageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className='App'>
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Home />
            </motion.div>
          </Route>
          <Route exact path='/login'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Login />
            </motion.div>
          </Route>
          <Route exact path='/profile/:username'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Profile />
            </motion.div>
          </Route>
          <Route path='/mythreads'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <ThreadsPage />
            </motion.div>
          </Route>
          <Route path='/thread/:id'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <SingleThreadPage />
            </motion.div>
          </Route>
          <Route path='/browse'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Browse />
            </motion.div>
          </Route>
          <Route exact path='/social'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Social />
            </motion.div>
          </Route>
          <Route exact path='/comments/:type/:id'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <CommentsPage />
            </motion.div>
          </Route>
          <Route path='/feed'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Feed />
            </motion.div>
          </Route>
          <Route path='/loading'>
            <motion.div
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <Loading />
            </motion.div>
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
