import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Spinner from '../Components/Spinner';

const PrivetRoute = ({ children }) => {
   const { user, loding } = useAuth();
   const location = useLocation()

   if (loding) return <Spinner />


   if (user) {
      return children
   }
   return <Navigate to={'/signIn'} state={location?.pathname} />


};

export default PrivetRoute;