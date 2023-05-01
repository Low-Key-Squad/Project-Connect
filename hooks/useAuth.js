import React, { createContext, useContext, useEffect } from "react";
import * as Google from "expo-google-app-auth";
import {
    GoogleAuthProvide,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

   const config =  { 
    //androidClientId: '' //link z googleService
    //iosClientId: //link z googleServices
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
};


export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        
     }, [])

const signInWithGoogle = async () => {
    Google.loginAsync(config).then(async (logInResult) => {
        if (logInResult.type === "success") {

            const { idToken, accessToken } = logInResult;
            const credential = GoogleAuthProvider.credential(idToken, accessToken);

            await signInWithCredential(auth, credential);
           }

           return Promise.reject();
        })
        .catch((error) => setError(error));
    };


    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}