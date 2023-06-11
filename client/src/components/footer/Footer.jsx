import React from "react";
import "./Footer.css";
import Search from "../search/Search";

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
        <img className="githubLogo" src="/images/square-github.svg" alt="" />
      </div>
      <div className="secondFooter">
        <button className="footerSubTitle">Social</button>
        <button className="footerSubTitle">Profile</button>
        <button className="footerSubTitle">Browse</button>
      </div>
      <div className="firstFooter">
        <div className="firstSubFooter">
          <div className="footerTitle">Contributors</div>
        </div>
        <button>James Schoeder</button>
        <button>Kolt Bodzo</button>
        <button>Roy Hargrave</button>
        <button>Xaviar Witherspoon</button>
      </div>
    </div>
  );
}

export default Footer;
