import React, { useState, useEffect } from 'react';
import "../Nav.css";


function Nav() {
  const [show, handleshow] = useState(false);
  
  const transitionNavBar = () => {
    if(window.scrollY > 100){
      handleshow(true);
    }
    else{
      handleshow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    // {`nav ${show && "nav__black"}`}
    <div className={`nav ${show && "nav_black"}`}>
      <img 
        className='nav__logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Netflix Logo'
      />

      <img 
        className='nav__avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        alt='User Pofile Image'
      /> 
    </div>
  )
}


export default Nav
