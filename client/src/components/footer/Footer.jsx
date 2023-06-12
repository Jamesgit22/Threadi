import React from "react";
import "./Footer.css";
import Search from "../search/Search";
import GitHub  from "./footerLink";
import Auth from "../../utils/auth"

function gitHub(url) {
    window.location.href = url;
  }
  
  const browse = () => {
    window.location.href = `/browse`;
  }
  
    const profile = () => {
      if (Auth.loggedIn()) {
        const username = Auth.getProfile().data.username;
        window.location.href = `/profile/${username}`;
      } else {
        window.location.href = '/login';
      }
    };
    
    
    const social = () => {
      if (Auth.loggedIn()) {
        const username = Auth.getProfile().data.username;
        window.location.href = "/threadspage";
      } else {
        window.location.href = "/login";
      }
    };
   
    
function Footer() {
  return (
    <div className="footerContainer">
      <div className="firstFooter">
        <div className="firstSubFooter">
          <div className="footerTitle">Threadi</div>
        </div>
        <div className="footerSubTitle">
          Follow Threadi for more exciting content
        </div>
        <button onClick= {() => gitHub('https://github.com/Jamesgit22/Threadi')} className="logo"></button>
      </div>
      <div className="secondFooter">
      <button onClick={social} className="footerSubTitle">Social</button>
        <button onClick={profile} className="footerSubTitle">Profile</button>
        <button onClick={browse} className="footerSubTitle">Browse</button>
      </div>
      <div className="firstFooter">
        <div className="firstSubFooter">
          <div className="footerTitle">Contributors</div>
        </div>
        <GitHub />
      </div>
    </div>
  );
}

export default Footer;