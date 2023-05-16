import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
import UserProfile from "../components/ImageDisplay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Profile() {

  const nameRef = useRef();
  const ageRef = useRef();
  const manRef = useRef();
  const descriptionRef = useRef();
  const StateRef = useRef();
  const userId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user_id="))
  ?.split("=")[1];


  
  const onSubmit=(ev)=>{
    ev.preventDefault()
    const payload = new FormData();
    payload.append("name", nameRef.current.value);
    payload.append("age", ageRef.current.value);
    payload.append("gender", manRef.current.checked ? "man" : "woman");
    payload.append("State", StateRef.current.value);
    payload.append("description", descriptionRef.current.value);
    payload.append("user_id", userId);
    console.log(payload);
    axiosClient.post('/save',payload)
    .then(response=>{
      const successMessage = "Zapisano";
        toast.success(successMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });

    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        const errorMessage = "Wystąpił błąd podczas zapisywania zmian. Proszę sprawdzić czy zostały wypełnione pola.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });
      } 
      }
    );
    
     
  }
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    
    return (

      
      <>
        <div>
        <Link to='/menu'><button className='Menu-button'>Menu</button></Link>
        </div>
        <div className="profile">
            <h2>Create Your Profile</h2>

            <form onSubmit={onSubmit} className="form-profile">
                <section>
                    <h2>First Name</h2>
                        <input
                            type="text"
                            ref={nameRef}
                            placeholder="First Name"
                            className="name-profile"
                        />
                     <h2>State</h2>
                      <select value={selectedOption} onChange={handleOptionChange} ref={StateRef}>
                          <option value="">---Wybierz---</option>
                          <option value="Dolnośląskie">Dolnośląskie</option>
                          <option value="Kujawsko-Pomorskie">Kujawsko-Pomorskie</option>
                          <option value="Lubelskie">Lubelskie</option>
                          <option value="Lubuskie">Lubuskie</option>
                          <option value="Łódzkie">Łódzkie</option>
                          <option value="Małopolskie">Małopolskie</option>
                          <option value="Mazowieckie">Mazowieckie</option>
                          <option value="Opolskie">Opolskie</option>
                          <option value="Podkarpackie">Podkarpackie</option>
                          <option value="Podlaskie">Podlaskie</option>
                          <option value="Pomorskie">Pomorskie</option>
                          <option value="Śląskie">Śląskie</option>
                          <option value="Świętokrzyskie">Świętokrzyskie</option>
                          <option value="Warmińsko-Mazurskie">Warmińsko-Mazurskie</option>
                          <option value="Wielkopolskie">Wielkopolskie</option>
                          <option value="Zachodniopomorskie">Zachodniopomorskie</option>
                      </select>
                    <h2>Age</h2>

                            <input
                               
                                type="number"
                                ref={ageRef}
                                placeholder="YY"
                                min={18}
                            />  
                        

                    <h2>Gender</h2>
                        <div className="radio-container">
                            <input
                               
                                type="radio"
                                name="gender"
                                ref={manRef}
                                value="man"
                            />
                            Man

                            <input
                                
                                type="radio"
                                name="gender"
                                value="woman"
                            />
                            Woman
                        </div>
                    <h2>About me</h2>
                    <input
                        id="about"
                        type="text"
                        ref={descriptionRef}
                        className="about"
                     
                    />
                </section>
                <input type="submit" value="Save" ></input>
            </form>
            <ToastContainer toastClassName="toast-profiles"/>
        </div>
      </>
    )
}
