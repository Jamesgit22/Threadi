import React from "react";
import "./Signupmodal.css";

const SignUpModal = ({ closeModal }) => {
  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;