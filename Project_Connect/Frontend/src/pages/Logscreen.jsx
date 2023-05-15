import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import { useRef } from "react"
import axiosClient from "../axios-client";


export default function Logscreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser,setToken}=useStateContext()

  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload={
      email:emailRef.current.value,
      password:passwordRef.current.value,
    }
    console.log(payload);
    axiosClient.post('/login',payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
      const userId = data.user.id; // Otrzymane user_id z serwera
      document.cookie = `user_id=${userId}; path=/;`;
    })
    .catch(err=>{
      console.log(err);
      const response = err.response;
      if (response && response.status==422){
        console.log(response.data.errors);
      }
    })
  }

    return (
      <>
        <div className="login-screen">
          <div className="Form-login">
          <Link to='/home'>
          <button  className="Exit-button">X</button>
          </Link>
          <h1>Log in</h1>
          <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="Login-button">Login</button>
          </form>
          </div>
        </div>
        
      </>
    )
  }
