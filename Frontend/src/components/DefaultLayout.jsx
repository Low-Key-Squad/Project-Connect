import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [userName, setUserName] = useState('');

  const userId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_id="))
    ?.split("=")[1];
    useEffect(() => {
        if (userId) {
            axiosClient
            .get(`/name/${userId}`)
            .then((response) => {
                setUserName(response.data.name);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [userId]);


        useEffect(() => {
            const interval = setInterval(() => {
            if (userId) {
                axiosClient
                .get(`/name/${userId}`)
                .then((response) => {
                    setUserName(response.data.name);
                })
                .catch((error) => {
                    console.error(error);
                });
            }
            }, 5000); 

            return () => clearInterval(interval); 
        }, [userId]);

  if (!token) {
    return <Navigate to="/home" />;
  }

  console.log(token);
  console.log(userName)
  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  return (
    <div id="defaulLayout">
      
        <div>
          <div className="User-Name">
            {userName && <p>Witaj, {userName}</p>}
          </div>
          <button href="#" onClick={onLogout} className="loguot">logout</button>
        </div>
    
      <main>
        <Outlet />
      </main>
    </div>
  );
}