import React from 'react';
import './login.css';

export default function Login() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 text-center pt-5 pb-1 mt-5'>
            <h2 id='login'>
              Welcome<br></br>back
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <form>
              <div className='row justify-content-center pb-3'>
                <div className='col-10'>
                  <input
                    className='inputs'
                    type='text'
                    placeholder='username'
                  />
                </div>
              </div>
              <div className='row  justify-content-center'>
                <div className='col-10'>
                  <input
                    className='inputs'
                    type='text'
                    placeholder='password'
                  />
                </div>
              </div>
              <div className='row  justify-content-center'>
                <div className='col-8 text-center pt-4'>
                  <button id='login-btn' type='submit'>
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='row pt-5'>
          <div className='col-12 d-flex justify-content-center'>
            <div className='col-4 text-center'>
              <button className='nav-btns' id='go-back-btn'>
                Go Back
              </button>
            </div>
            <div className='col-4 text-center'>
              <button className='nav-btns' id='sign-up-btn'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className='row pt-4'>
          <div className='col-12 text-center'>
            <a href=''>
              <p id='forgot-pass' className='mb-5'>
                Forgot Password?
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
