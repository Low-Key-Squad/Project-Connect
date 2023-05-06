import logo from '../images/logo.png'
import colorLogo from '../images/smallRed.png'


const Nav = ({ authToken, minimal, setShowModal, showModal   }) => {
    
    const handleClick = () => {
      setShowModal(true)
    }
  
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