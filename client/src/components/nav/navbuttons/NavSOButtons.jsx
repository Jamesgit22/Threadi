import React from "react";
import "../Nav.css";
import Auth from "../../../utils/auth";

function NavSOButtons() {
    return (
        
        <div className="desktopSignOn col-3 d-flex justify-content-end">
            <button onClick={Auth.logout} className="desktop-signup-btns me-3">Sign Out</button>
        </div>
    );
}

export default NavSOButtons;