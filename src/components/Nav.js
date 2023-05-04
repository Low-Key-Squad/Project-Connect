import logo from '../images/logo.png'
import colorLogo from '../images/smallRed.png'


const Nav = ({ authToken, minimal   }) => {
    
    
  
    return (
      <nav>
        <div className="logo-container">
          <img
            className="logo"
            src={minimal ? colorLogo : logo}
            alt="logo"
          />
        </div>
        {!authToken && (
          <button className="nav-button">
            Log in
          </button>
        )}
      </nav>
    );
  };
  export default Nav;