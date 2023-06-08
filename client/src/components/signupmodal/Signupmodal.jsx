import React, { useState } from "react";
import "./Signupmodal.css";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

const SignUpModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      // Call the mutation to add the user
      const { data } = await addUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      console.log("User added:", data);

      // Reset the form fields
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle the error
    }
  };

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordsMatch && (
            <p className="error-message">Passwords do not match</p>
          )}
          <button type="submit">Sign Up</button>
          <button onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
