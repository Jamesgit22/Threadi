import React from "react";
import "./Signupmodal.css";

const SignUpModal = ({ closeModal }) => {
  return (
    <div className="backdrop">
      <div className="modal" id="modal">
        <div className="modal-content">
          <div id="modal-overlay">
            <h2 className="modalTitle">Sign Up</h2>
            <form className="modalForm">
              <input
                className="modalFormInput"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <input
                className="modalFormInput"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="modalFormInput"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <input
                className="modalFormInput"
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
              />
              <button className="modalSubmit" type="submit">Sign Up</button>
              <button className="modalClose" onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
