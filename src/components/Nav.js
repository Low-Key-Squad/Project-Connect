import logo from '../images/logo.png'
import colorLogo from '../images/smallRed.png'
import React from 'react';


const Nav = ({  minimal, setShowModal, showModal, setIsSignUp   }) => {
    
    const handleClick = () => {
      setShowModal(true)
      setIsSignUp(false)
    }

    const authToken = false
  
    return (
      <nav>
        <div className="logo-container">
          <img className="logo" src={minimal ? colorLogo : logo} />
        </div>


        {!authToken && !minimal &&  <button 
        className="nav-button"
        onClick={handleClick}
        disabled={showModal}
            > Log in </button>}
  
      </nav>
    );
  };
  export default Nav;