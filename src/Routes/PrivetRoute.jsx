import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Spinner from '../Components/Spinner';

const PrivetRoute = ({ children }) => {
   const { user, loding } = useAuth();

   if (loding) return <Spinner/>
   


   if(!user) return <Navigate to={'/signIn'}/>
   return children
   

};

export default PrivetRoute;