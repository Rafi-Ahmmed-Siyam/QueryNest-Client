import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_URL,
   withCredentials: true
})

const useAxiosSecure = () => {
   const { userLogout } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      axiosInstance.interceptors.response.use((res) => {
         return res;
      }, async (error) => {
         // console.log('from interxeptor', error.response.data.message);

         if (error.response.status === 401 || error.response.status === 403) {
            userLogout();
            navigate('/signIn', { replace: true  });
            toast(error.response.data.message, {
               icon: '⚠️',
               style: {
                  color: 'red',
               }
            });
         }

         return Promise.reject(error);
      }
      )
   }, [userLogout, navigate])

   return axiosInstance
};

export default useAxiosSecure;