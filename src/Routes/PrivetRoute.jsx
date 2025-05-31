import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const PrivetRoute = ({ children }) => {
   const { user, loding } = useAuth();

   if (loding) return <>
      <div className='flex justify-center items-center min-h-[calc(100vh-391px)]'>
         <ScaleLoader
            color='#0EA5E9'
         />
      </div>
   </>


   if(!user) return <Navigate to={'/signIn'}/>
   return children
   

};

export default PrivetRoute;