import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser]= useState(null)
    const [loading, setLoading]= useState(true)
    
    const signUpwithEmail =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithEmail =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInwithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

const updateUserProfile =(name, photo)=>{
   return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
}

    const logOut =()=>{
        return signOut(auth)
    }

    const deleteFromFirebase =()=>{
        return deleteUser(user)
    }


    useEffect(()=>{
       const unsubscibe= onAuthStateChanged(auth, currentUser =>{
           setUser(currentUser)

           if(currentUser){
            axios.post('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/jwt', {email: currentUser.email})
            .then(data =>{
                console.log(data);
                localStorage.setItem('access-token', data.data)
                setLoading(false)
            })
           }
           else{
            localStorage.removeItem('access-token')
           }

           
            console.log(currentUser);
        })
        return ()=> {
            return unsubscibe()
        }
    },[])


    const authinfo={
        user,
        loading,
        setUser,
        setLoading,
        signUpwithEmail,
        loginWithEmail,
        signInwithGoogle,
        logOut,
        updateUserProfile,
        deleteFromFirebase
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;