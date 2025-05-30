import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../Contexts/AuthContext";
import { auth } from "../Firebase/Firebase.config";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
   const googleProvider = new GoogleAuthProvider();
   const [user, setUser] = useState(null)

   const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
   }
   const userSignin = (email, password) => {
      return signInWithEmailAndPassword(auth,email, password);
   }
   const googleLogin = () => {
      return signInWithPopup(auth, googleProvider)
   }
   const updateuserProfile = (name,image) => {
      return updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: image,
      })
   }


   const userLogout = () => {
      setUser(null);
      return signOut(auth)
   }

   //Set a observer;
   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
         if (currentuser) {
            setUser(currentuser);
            console.log('userData----->', currentuser)
         } else {
            console.log("User Loged Out")
         }
      })

      return () => {
         return unSubscribe()
      }
   }, [])


   const authData = {
      user,
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