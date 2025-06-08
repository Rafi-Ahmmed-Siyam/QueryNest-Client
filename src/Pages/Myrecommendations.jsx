import React, { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { timeDateFormater } from '../Utilities/DateTimeFormater';
import { useNavigate } from 'react-router-dom';

const Myrecommendations = () => {
   const { user } = useAuth();

   const { data: recommendations, isLoading, isError } = useQuery({
      queryKey: ['recommendations', user?.email],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/recommender-data/${user.email}`);
         return data;
      }
   });

   
   if (isLoading) return <Spinner />

   if (isError) return <p className="text-red-500">Failed to load recommendations.</p>;


   return (
      <div className='max-w-[1450px] mx-auto px-4 lg:px-0'>
         <h1 className="text-base lg:text-xl font-semibold text-gray-800 pt-5 lg:pt-10">My Suggested Alternatives : <div className="badge badge-soft badge-primary">{recommendations?.length}</div></h1>

         {/* Table */}
         <div className='py-5'>
            <div className="overflow-x-auto border p-2.5 rounded-xl">
               <table className="table">
                  {/* head */}
                  <thead>
                     <tr>
                        <th>Product Name & Time</th>
                        <th>Title</th>
                        <th>Reason</th>
                        <th>Query Title</th>
                        <th>Query Product</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        recommendations.map(recommendation =>
                           <tr key={recommendation._id}>
                              <td>
                                 <div className="flex items-center gap-3">
                                    <div className="avatar">
                                       <div className="mask mask-squircle h-12 w-12">
                                          <img
                                             src={recommendation?.recommendedProductImageUrl}
                                             alt="Avatar Tailwind CSS Component" />
                                       </div>
                                    </div>
                                    <div>
                                       <div className="font-bold">{recommendation?.recommendedProductName}</div>
                                       <div className="text-sm opacity-50">{timeDateFormater(recommendation?.recommendedAt)}</div>
                                    </div>
                                 </div>
                              </td>
                              <td>
                                 {recommendation?.recommendationTitle}
                              </td>
                              <td className='w-2xs'>{recommendation?.recommendationReason} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse autem aperiam tempora dolorem veritatis minima nam laboriosam quos et ratione. </td>
                              <td>{recommendation?.queryTitle}</td>
                              <td>{recommendation?.productName}</td>
                              <th>
                                 <button className="btn btn-circle border-none bg-transparent"><MdDeleteForever className='text-2xl text-red-600' /></button>
                              </th>
                           </tr>
                        )
                     }
                     {/* row 1 */}

                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Myrecommendations;