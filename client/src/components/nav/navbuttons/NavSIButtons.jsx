import React from "react";
import { useState } from "react";
import "../Nav.css";
import SignupModal from "../../signupmodal/Signupmodal";

function NavSIButtons() {
    const [showModal, setShowModal] = useState(false);

    const handleSignupClick = () => {
        setShowModal(true);
    };

    return (
        <div className="desktopSignOn col-3 d-flex justify-content-end">
            <a href="/login" className="desktop-signin-btns me-3">Sign In</a>
            <button
                className="desktop-signup-btns"
                onClick={handleSignupClick}
            >
                Sign Up
            </button>
            {showModal && <SignupModal setShowModal={setShowModal} />}
        </div>
    );
}

export default NavSIButtons;