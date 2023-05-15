import { useRef } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


export default function Singup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const {setUser,setToken}=useStateContext()


  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload={
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value,
    }
    console.log(payload);
    axiosClient.post('/signup',payload)
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
          <div className="Form-SignUp">
          <Link to='/home'>
          <button  className="Exit-button">X</button>
          </Link>
          <h1>Sign up</h1>
          <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="ConfirmPassword"/>
          <button className="SignupButton">Sign up</button>
          </form>
          </div>
         
        </div>
      
    </>
  )
}
