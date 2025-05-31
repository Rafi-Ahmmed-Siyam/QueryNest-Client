import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../Contexts/AuthContext";
import { auth } from "../Firebase/Firebase.config";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
   const googleProvider = new GoogleAuthProvider();
   const [user, setUser] = useState(null);
   const [loding,setLoding] = useState(true)

   const createUser = (email, password) => {
      setLoding(true)
      return createUserWithEmailAndPassword(auth, email, password)
   }
   const userSignin = (email, password) => {
      setLoding(true)
      return signInWithEmailAndPassword(auth,email, password);
   }
   const googleLogin = () => {
      setLoding(true)
      return signInWithPopup(auth, googleProvider)
   }
   const updateuserProfile = (name,image) => {
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
      const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
         if (currentuser) {
            setUser(currentuser);
            setLoding(false)
            console.log('userData----->', currentuser)
         } else {
            setLoding(false)
            console.log("User Loged Out")
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