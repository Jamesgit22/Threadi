import React from "react";
import "./Footer.css";
import Auth from "../../utils/auth";
import FooterNav from "./footerNav/FooterNav";

function Footer() {
  const loggedIn = Auth.loggedIn();

  if(!(loggedIn) && !(window.location.pathname === '/login') && !(window.location.pathname === '/')) {
    window.location.replace('/');
  }

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
         { loggedIn ? <FooterNav /> : null }
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
