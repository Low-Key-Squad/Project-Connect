import { useRef } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      const userId = data.user.id; 
      document.cookie = `user_id=${userId}; path=/;`;
    })
    .catch(err=>{
      console.log(err);
      const response = err.response;
      const errorMessage = "Wystąpił błąd podczas rejestracji. Proszę sprawdzić czy zostały wypełnione pola i czy hasło zawiera minimum 8 znaków, cyfry i liczby oraz zank specialny.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });
      if (response && response.status==422){
        console.log(response.data.errors);
      }
    })
  }

  return (
    <>
    <img src="/public/white.png" className="LogLogo"/>
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
          <ToastContainer toastClassName="toast-signup"/>
        </div>
      
    </>
  )
}
