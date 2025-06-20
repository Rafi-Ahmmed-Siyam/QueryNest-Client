import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../Contexts/AuthContext";
import { auth } from "../Firebase/Firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
   const googleProvider = new GoogleAuthProvider();
   const [user, setUser] = useState(null);
   const [loding, setLoding] = useState(true)

   const createUser = (email, password) => {
      setLoding(true)
      return createUserWithEmailAndPassword(auth, email, password)
   }
   const userSignin = (email, password) => {
      setLoding(true)
      return signInWithEmailAndPassword(auth, email, password);
   }
   const googleLogin = () => {
      setLoding(true)
      return signInWithPopup(auth, googleProvider)
   }
   const updateuserProfile = (name, image) => {
      return updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: image,
      })
   }


   const userLogout = () => {
      setLoding(true);
      setUser(null);
      return signOut(auth)
   }

   //Set a observer;
   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, async (currentuser) => {
         if (currentuser) {

            const { data } = await axios.post(`${import.meta.env.VITE_URL}/jwt`, { email: currentuser.email }, { withCredentials: true })
            // console.log(data)
            setUser(currentuser);
            setLoding(false)
            // console.log('userData----->', currentuser)
         } else {
            const { data } = await axios.get(`${import.meta.env.VITE_URL}/logOut`, { withCredentials: true })
            // console.log(data)
            setLoding(false)
            // console.log("User Loged Out")
         }
      })

      return () => {
         return unSubscribe()
      }
   }, [])


   const authData = {
      user,
      loding,
      setLoding,
      createUser,
      userSignin,
      googleLogin,
      updateuserProfile,

      userLogout,
   }
   return (
      <AuthContext.Provider value={authData}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;