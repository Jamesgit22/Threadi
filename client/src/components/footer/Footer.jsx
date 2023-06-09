import React from "react";
import './Footer.css';
import Search from '../search/Search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="firstFooter">
        <div className="firstSubFooter">
            <div>Threadi</div>
            <Search />
        </div>
        <div>Follow Threadi for more exciting content</div>
        <div>

        </div>
      </div>
      <div>
        yo
      </div>
    </div>
  );
}

export default Footer;
