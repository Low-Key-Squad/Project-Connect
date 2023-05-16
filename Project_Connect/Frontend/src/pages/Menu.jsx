import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserProfile from "../components/ImageDisplay";

export default function Menu() {
  const userId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user_id="))
  ?.split("=")[1];
  
  
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
