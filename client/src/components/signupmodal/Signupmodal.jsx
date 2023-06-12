import React from "react";
import { useHistory } from "react-router-dom";
import "./Signupmodal.css";
import { useMutation, gql } from "@apollo/client";
import { ADD_USER } from '../../utils/mutations';

const SignUpModal = ({ closeModal }) => {
  const history = useHistory(); // React Router history object

  // Define state variables for form inputs
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Define the mutation hook
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the mutation
    addUser({ variables: { username, email, password } })
      .then((result) => {
        // Handle successful mutation
        if (result.data.addUser) {
          console.log("Username:", username);
          console.log("User added successfully:", result.data);
          // Redirect the user to the profile page with the username
          history.push(`/profile/${username}`);
        } else {
          console.error("Failed to add user:", result.data);
        }
      })
      .catch((error) => {
        // Handle mutation error
        console.error("Failed to add user:", error);
      });
  };

  return (
    <div className="backdrop">
      <div className="modal" id="modal">
        <div className="modal-content">
          <div id="modal-overlay">
            <h2 className="modalTitle">Sign Up</h2>
            <form className="modalForm" onSubmit={handleSubmit}>
              <input
                className="modalFormInput"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="modalFormInput"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="modalFormInput"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
