import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Components/Spinner';
import { timeDateFormater } from '../Utilities/DateTimeFormater';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const RecommendationsForMe = () => {
   const { user } = useAuth();
   const axiosInstance = useAxiosSecure()

   const { data: recommendationsForMe, isLoading, isError } = useQuery({
      queryKey: ['recommendationsforme', user?.email],
      queryFn: async () => {
         const { data } = await axiosInstance.get(`${import.meta.env.VITE_URL}/recommender-data/${user.email}`);
         return data;
      }
   });


   if (isLoading) return <Spinner />
   if (isError) return <p className="text-red-500">Failed to load recommendations.</p>;




   return (
      <div className='max-w-[1450px] mx-auto px-4 lg:px-0'>
         <h1 className="text-base lg:text-xl font-semibold text-gray-800 pt-5 lg:pt-10 mb-3">
            Recommendations on My Queries :
            <span className="ml-2 badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
               {recommendationsForMe?.length}
            </span>
         </h1>

         <div className='py-5'>
            {
               (recommendationsForMe.length === 0) ?
                  <div className="text-center py-10">
                     <p className="text-gray-500 text-xl">
                        You haven’t received any recommendations on your queries yet.
                     </p>
                     <p className="text-gray-400 text-sm mt-1">
                        Once someone recommends alternatives on your posted queries, they’ll show up here.
                     </p>
                  </div>
                  :
                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                     <table className="table text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                           <tr>
                              <th className="py-3 px-4">Query Title</th>
                              <th className="py-3 px-4">Query Product</th>
                              <th className="py-3 px-4">Recommendation <br /> Title</th>
                              <th className="py-3 px-4">Recommended <br /> Product</th>
                              <th className="py-3 px-4">Recommended <br /> Image</th>
                              <th className="py-3 px-4">Reason</th>
                              <th className="py-3 px-4">Recommender</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                           {
                              recommendationsForMe.map(recommendation => (
                                 <tr key={recommendation._id} className="">
                                    <td className="px-4 py-3 text-gray-800 font-medium w-2xs">
                                       {recommendation?.queryTitle}
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">
                                       {recommendation?.productName}
                                    </td>
                                    <td className="px-4 py-3 text-blue-700 font-semibold">
                                       {recommendation?.recommendationTitle}
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">{recommendation?.recommendedProductName}</td>
                                    <td className="px-4 py-3">
                                       <img
                                          src={recommendation?.recommendedProductImageUrl}
                                          alt="Recommended Product"
                                          className="w-12 h-12 object-cover rounded"
                                       />
                                    </td>
                                    <td className="px-4 py-3 text-gray-700 max-w-xs">
                                       {recommendation?.recommendationReason}
                                    </td>
                                    <td className="px-4 py-3">
                                       <div className="flex items-center gap-2">
                                          <div className='tooltip' data-tip={recommendation?.recommenderEmail}>
                                             <img
                                                src={recommendation?.recommenderImg}
                                                alt="Recommender"
                                                className="w-8 h-8 rounded-full object-cover"
                                             />
                                          </div>
                                          <div>
                                             <p className="text-gray-800 font-medium">{recommendation?.queryCreatorUserName}</p>
                                             <p className="text-xs text-gray-500">{timeDateFormater(recommendation?.recommendedAt)}</p>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              ))
                           }

                        </tbody>
                     </table>
                  </div>
            }

         </div>
      </div>



   );
};

export default RecommendationsForMe;