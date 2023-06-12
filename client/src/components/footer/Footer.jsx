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
        <a id="gitContainer" href='https://github.com/Jamesgit22/Threadi'>
          <img className="githubLogo" src="/images/circle-github.svg" alt="" />
        </a>
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
        <a href='https://github.com/Jamesgit22'>James Schoeder</a>
        <a href='https://github.com/Elfelfa'>Kolt Bodzo</a>
        <a href='https://github.com/rahargrave'>Roy Hargrave</a>
        <a href='https://github.com/codemonkeyspoon'>Xaviar Witherspoon</a>
      </div>
    </div>
  );
}

export default Footer;
