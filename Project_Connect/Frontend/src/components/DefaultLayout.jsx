import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


export default function DefaultLayout() {
const {user,token,setUser,setToken}=useStateContext()


if(!token){
      return <Navigate to='/home'/>  
}
console.log(token);
const onLogout=ev=>{
ev.preventDefault()


axiosClient.post('/logout')
.then(() =>{
    setUser({}),
    setToken(null)
});


}

    return (
        <div id="defaulLayout">
            <header>
                <div>
                   
                    <button href="#" onClick={onLogout} className="loguot">logout</button>
                </div>
            </header>
            <main>   
                <Outlet />
            </main>
       
        </div>
      
 
      
    )
  }
