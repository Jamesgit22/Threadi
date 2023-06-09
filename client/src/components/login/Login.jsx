import React from 'react';
import { useState } from 'react';
import './login.css';
import { motion } from 'framer-motion';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

export default function Login() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });
  const [validated] = useState(true);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token);
      window.location.href = `/profile/${userFormData.username}`;
    } catch (err) {
      console.log(err);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <div id='overlay'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className='container-fluid d-flex p-0 m-0 justify-content-center'
          id='login-main'
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            id='welcome-container'
            className='col-6'
          >
            <div className='row justify-content-center'>
              <div id='welcome-card' className='col-8 pt-5 mt-5'>
                <motion.h2
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 3 }}
                >
                  Welcome back,
                </motion.h2>
                <motion.p
                  id='welcome-msg'
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 3.2 }}
                >
                  Find the best reviews or make your own with Threadi
                </motion.p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            id='login-card'
            className='col-6'
          >
            <div className='row justify-content-center'>
              <motion.div
                initial={{ opacity: 0.1, x: '200px' }}
                whileInView={{ opacity: 1, x: '0px' }}
                transition={{ duration: 1, delay: 2 }}
                className='col-8 text-center pt-5 pb-1 mt-5'
              >
                <h2 id='login'>Login</h2>
              </motion.div>
            </div>
            <div className='row'>
              <motion.div
                className='col-12'
                initial={{ opacity: 0, x: '200px' }}
                whileInView={{ opacity: [0, 1], x: '0px' }}
                transition={{ duration: 1, delay: 2 }}
              >
                <form
                  id='form-card'
                  noValidate
                  validated={validated}
                  onSubmit={handleFormSubmit}
                >
                  <div className='row justify-content-center pb-3'>
                    <div className='col-10'>
                      <input
                        className='inputs'
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                      />
                    </div>
                  </div>
                  <div className='row justify-content-center'>
                    <div className='col-10'>
                      <input
                        className='inputs'
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                      />
                    </div>
                  </div>
                  <motion.div
                    className='row justify-content-center'
                    initial={{ opacity: 0, x: '200px' }}
                    whileInView={{ opacity: [0, 1], x: '0px' }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    <div className='col-8 text-center pt-4'>
                      <button
                        id='login-btn'
                        type='submit'
                        disabled={
                          !(userFormData.username && userFormData.password)
                        }
                      >
                        Login
                      </button>
                    </div>
                  </motion.div>
                </form>
              </motion.div>
            </div>
            <div id='nav-btns-container' className='row pt-5'>
              <div className='col-12 d-flex justify-content-center'>
                <motion.div
                  id='go-back-btn'
                  className='col-4 text-center'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <button className='nav-btns'>Go Back</button>
                </motion.div>
                <motion.div
                  className='col-4 text-center'
                  id='sign-up-btn'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.3, delay: 2.5 }}
                >
                  <button className='nav-btns'>Sign Up</button>
                </motion.div>
              </div>
            </div>
            <div className='row pt-4'>
              <motion.div
                className='col-12 text-center'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 2.8 }}
              >
                <a href=''>
                  <p id='forgot-pass' className='mb-5'>
                    Forgot Password?
                  </p>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
