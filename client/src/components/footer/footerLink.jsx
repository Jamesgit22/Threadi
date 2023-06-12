 import React from "react";


 function GitHub() {
    const james = () => {
      window.location.href = 'https://github.com/Jamesgit22';
    };
  
    const kolt = () => {
      window.location.href = 'https://github.com/Elfelfa';
    };
  
    const roy = () => {
      window.location.href = 'https://github.com/rahargrave';
    };
  
    const Xaviar = () => {
      window.location.href = 'https://github.com/codemonkeyspoon';
    };


return (
  <div class="firstFooter">
    <button onClick={james}>James Schoeder</button>
    <button onClick={kolt}>Kolt Bodzo</button>
    <button onClick={roy}>Roy Hargrave</button>
    <button onClick={Xaviar}>Xaviar Witherspoon</button>
  </div>
);
};

export default GitHub