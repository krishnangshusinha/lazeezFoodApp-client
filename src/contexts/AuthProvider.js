import React, { createContext, useEffect, useState } from 'react'
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);      // for authentication provided by the firebase .Refer the doc --> https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
const googleProvider = new GoogleAuthProvider();      // refer the doc --> https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0



const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    

/* VARIOUS IMP FUNCTIONS */

    // creating user ( all these functions that are returned are already provided by the firebase itself )
    const createUser = (email , password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email , password);        // refer from doc --> https://firebase.google.com/docs/auth/web/password-auth?hl=en&authuser=0
    }

    // signup with google 
    const signUpWithGmail = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);      // refer doc --> https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0
    }

    // login with email and password
    const login = (email , password) => {
      return signInWithEmailAndPassword(auth,email,password);    // refer doc --> https://firebase.google.com/docs/auth/web/password-auth?hl=en&authuser=0
    }

    // logout/signout
    const logout = () => {
      localStorage.removeItem("genius-token");

      return signOut(auth);         // refer doc --> https://firebase.google.com/docs/auth/web/password-auth?hl=en&authuser=0
    }

    // update users profile
    const updateUserProfile = (name , photoURL) => {

      return updateProfile(auth.currentUser, {        // refer doc --> https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=0
        displayName: name, photoURL: photoURL
      })
    
    }

    // to check if user if signedIn or not
    useEffect( () => {

      const unsubscribe  = onAuthStateChanged(auth, (currentUser) => {      // refer doc --> https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=0
        
        setUser(currentUser);   // set user to current user

        if (currentUser) {    // if current user is logged in

          const userInfo = { email: currentUser.email };

          axios.post("http://localhost:5000/jwt", userInfo).then((response) => {      // send the email of current user for token generation
            
            if (response.data.token) {      // if token is generated
              localStorage.setItem("access-token", response.data.token);    // use local storage to store the token data
            }

          });

        } 
        else {
          localStorage.removeItem("access-token");    // if user not logged in remove it
        }

        setLoading(false);
      
      });

      return () => {        // each time the component is rendered unsubscribe() is called
        return unsubscribe();
      }

    },[])


    // variables, states, or functions mentioned in authInfo gets globally shared among all components
    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        login,
        logout,
        updateUserProfile,
        loading,
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
