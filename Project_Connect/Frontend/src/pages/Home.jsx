import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {

  const {token}=useStateContext()

  if(token==1){
    console.log('działa')
  }

    return (
      <>
      <div className="Home">

        <Link to='/login'><button className="loginButton">login</button></Link>
        <div className="logo-container">
          <img src="public\black.png" className="logo" />
        <Link to='/signup'><button className="SignupButton">Signup</button></Link>
        </div>
        </div>
      </>
    )
  }
