import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Swipe() {

  const ageminRef = useRef();
  const agemaxRef = useRef();
  const StateRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const userId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user_id="))
  ?.split("=")[1];

  
  
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };


 
  const onSubmit = (ev) => {
    ev.preventDefault();
    const agemin = parseInt(ageminRef.current.value);
    const agemax = parseInt(agemaxRef.current.value);


    if (agemin >= agemax) {
      alert("Wprowadź poprawny zakres wieku!");
      return;
    }
    const payload = new FormData();
    payload.append("agemin", ageminRef.current.value);
    payload.append("agemax", agemaxRef.current.value);
    payload.append("gender", selectedGender);
    payload.append("State", StateRef.current.value);
    payload.append("user_id", userId);
    console.log(payload);
    fetchProfiles();
  };

  const fetchProfiles = async () => {
    try {
      const response = await axiosClient.get("/getprof", {
        params: {
          agemin: ageminRef.current.value,
          agemax: agemaxRef.current.value,
          gender: selectedGender,
          state: StateRef.current.value,
          user_id: userId,
        },
      });

  
      if (response.data.length > 0) {
        const shuffledProfiles = shuffle(response.data);
        setProfiles(shuffledProfiles);
        setCurrentProfileIndex(0);
        setCurrentProfile(shuffledProfiles[0]);
      } else {
        setProfiles([]);
        setCurrentProfileIndex(0);
        setCurrentProfile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextProfile = () => {
    const nextIndex = currentProfileIndex + 1;

    if (nextIndex < profiles.length) {
      setCurrentProfileIndex(nextIndex);
      setCurrentProfile(profiles[nextIndex]);
    } else {
      setCurrentProfile(null);
    
      console.log("Nie ma więcej profili do wyświetlenia.")
    }
  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDislike = () => {
    if (currentProfile) {
      handleNextProfile();
    }
  };
  
  const handleLike = () => {
    if (currentProfile) {
      const payload2= new FormData();
      payload2.append('user1_id',userId)
      payload2.append('user2_id',currentProfile.user_id)
      console.log(payload2)
      axiosClient.post('/addmatch',payload2)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        }
      })
      axiosClient.post('/ismatch',payload2)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        }
      })
      handleNextProfile();
    }
  };

 

    return (
      <>
        <div>
        <Link to='/menu'><button className='Menu-button'>Menu</button></Link>
        </div>
        <form className="Form-Swipe" onSubmit={onSubmit}>
        <label>Show Me:</label>
        <br></br>
        <label htmlFor="man-gender-interest">Man</label>
                    <div className="multiple-input-container">
                    
                                <input
                                  id="man-gender-interest"
                                  type="checkbox"
                                  value="man"
                                  checked={selectedGender === "man"}
                                  onChange={handleGenderChange}
                                />
                                
                                <label htmlFor="woman-gender-interest">Woman</label>
                                <input
                                  id="woman-gender-interest"
                                  type="checkbox"
                                  value="woman"
                                  checked={selectedGender === "woman"}
                                  onChange={handleGenderChange}
                                />
                                
                                <label htmlFor="man-gender-interest">Both</label>
                                <input
                                  id="man-gender-interest"
                                  type="checkbox"
                                  value="both"
                                  checked={selectedGender === "both"}
                                  onChange={handleGenderChange}
                                />
                              
                            <label>Age:</label>
                    
                              <input
                                  id="dob_year"
                                  type="number"
                                  ref={ageminRef}
                                  name="age"
                                  placeholder="MIN"
                                  min={18}
                              />  
                              <input
                                  id="dob_year"
                                  type="number"
                                  ref={agemaxRef}
                                  name="age"
                                  placeholder="MAX"
                                  min={19}
                              />  
                              <select value={selectedOption} onChange={handleOptionChange} ref={StateRef}>
                           <option className="Chose" value="">---Wybierz---</option>
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
                        </div>
                        <button className="Find-button" onClick={fetchProfiles}>Find</button>
        </form>
        {currentProfile && (
        <div>
          <h2>Profile</h2>
          <p>Photo: {currentProfile.prof}</p>
          <p>Name: {currentProfile.name}</p>
          <p>Age: {currentProfile.age}</p>
          <p>About me: {currentProfile.description}</p>
        </div>
      )}
      {!currentProfile && (
        <div>
          <h2 className="No-more-profiles">Brak więcej profili</h2>
        </div>
      )}
      <button className="No-Button" onClick={handleDislike}>Meh</button>
      <button className="Like-Button" onClick={handleLike}>Like</button>
    </>
  );
        
      
    
}

