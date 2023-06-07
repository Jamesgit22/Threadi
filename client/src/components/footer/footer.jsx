import React from 'react'
import  './footer.css';
export default function footer() {
    
  function gitHub(url) {
    window.location.href = url;
  }
  return (
    <>
    <footer>
       <button onClick= {() => gitHub('https://github.com/Jamesgit22/Threadi')} class="footerTitle" ></button>
       <div class="columns">
       <div class="column">
        <a class="footer"  href="https://github.com/Jamesgit22">
     James
    </a>
    <a class="footer" href="https://github.com/rahargrave">
     Roy
    </a>
    <a class="footer" href="https://github.com/codemonkeyspoon">
     Xaviar
    </a>
    <a class="footer" href="https://github.com/Elfelfa">
     Kolt
    </a>
    <a  class="footer" id="footerEnd" href="https://github.com/JoseTorres26">
     Jose
    </a>
       </div>
       <div class="column">
        <a class="footer"  href="/">
     Home
    </a>
    <a class="footer" href="/">
     Sign in
    </a>
    <a class="footer" href="/">
     About
    </a>
    <a class="footer" href="/">
     Profile
    </a>
       </div>
       </div>
     
    <p class="copy">©2023 HomeRow Homies | Rights Reserved | Threadi</p>
    </footer>
      
    </>
  )
}
