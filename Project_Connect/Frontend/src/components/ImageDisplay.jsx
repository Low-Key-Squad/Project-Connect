import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

const UserProfile = ({ userId }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
  try {
    const response = await axiosClient.get(`/prof?userId=${userId}`);
    setProfilePhoto(response.data);
  } catch (error) {
    console.log(error);
  }
};

    fetchProfilePhoto();
  }, [userId]);

  return (
    <div>
      {profilePhoto && <img src={profilePhoto} alt="Profile Photo" />} // Wyświetlanie zdjęcia profilowego, jeśli jest dostępne
    </div>
  );
};

export default UserProfile;