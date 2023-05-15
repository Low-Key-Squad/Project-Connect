import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Menu() {
  
    return (
      <>
        <div className="Menu">
          <img src="" className="MenuLogo"/>       

        </div>
        <div className="buttons-menu">
        <Link to='/chat'><button className="Chat ">Chat</button></Link>
        <Link to='/swipe'><button className="Swipe ">Swipe</button></Link>
        <Link to='/profile'><button className="Profile ">Profile</button></Link>
        </div>
        
      </>
    )
  }
