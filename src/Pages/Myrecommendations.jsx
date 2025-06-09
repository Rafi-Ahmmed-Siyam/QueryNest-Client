import React, { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import useAuth from '../Hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { timeDateFormater } from '../Utilities/DateTimeFormater';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Myrecommendations = () => {
   const { user } = useAuth();
   const queryClient = useQueryClient();

   const { data: recommendations, isLoading, isError } = useQuery({
      queryKey: ['recommendations', user?.email],
      queryFn: async () => {

         const { data } = await axios.get(`${import.meta.env.VITE_URL}/recommender-data/${user.email}?recommender=true`);
         return data;
      }
   });

   const { mutateAsync } = useMutation({
      mutationFn: async ({ id, queryId }) => {
         const { data } = await axios.delete(`${import.meta.env.VITE_URL}/delete-recommendetion/${id}?queryId=${queryId}`);
         console.log(data)
         return data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['recommendations'] })
         queryClient.invalidateQueries({ queryKey: ['recommendationsforme'] })
         queryClient.invalidateQueries({ queryKey: ['allQuries'] })
      },
      onError: () => {
         toast.error("Something went wrong")
      }

   })

   if (isLoading) return <Spinner />
   if (isError) return <p className="text-red-500">Failed to load recommendations.</p>;

   const handleDeleteRecommendation = async (id, queryId) => {
      try {
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: "#E0F2FE",
            showCancelButton: true,
            confirmButtonColor: "#28A745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            color: ""
         }).then(async (result) => {
            if (result.isConfirmed) {
               await mutateAsync({id, queryId})
               Swal.fire({
                  background: "#ECFDF5",
                  title: "Deleted!",
                  text: "Your recommendation has been deleted.",
                  icon: "success"
               });
            }
         });
         
      } catch (err) {
         console.log(err);
      }

   }

   return (
      <div className='max-w-[1450px] mx-auto px-4 lg:px-0'>
         <h1 className="text-base lg:text-xl font-semibold text-gray-800 pt-5 lg:pt-10 mb-3">
            My Suggested Alternatives :
            <span className="ml-2 badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
               {recommendations?.length}
            </span>
         </h1>

         {/* Table */}
         <div className='py-5'>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
               <table className="table text-sm">
                  {/* Head */}
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold p-5">
                     <tr>
                        <th className="py-3 px-4">Product Name & Time</th>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Reason</th>
                        <th className="py-3 px-4">Query Title</th>
                        <th className="py-3 px-4">Query Product</th>
                        <th className="py-3 px-4 text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                     {recommendations.map((recommendation) => (
                        <tr key={recommendation._id} className="hover:bg-gray-50">
                           <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                 <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                       <img
                                          src={recommendation?.recommendedProductImageUrl}
                                          alt="Product"
                                       />
                                    </div>
                                 </div>
                                 <div>
                                    <div className="font-medium text-gray-800">{recommendation?.recommendedProductName}</div>
                                    <div className="text-xs text-gray-500">{timeDateFormater(recommendation?.recommendedAt)}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-3 text-gray-800 font-medium">{recommendation?.recommendationTitle}</td>
                           <td className="px-4 py-3 text-gray-700 max-w-xs">{recommendation?.recommendationReason}</td>
                           <td className="px-4 py-3 text-gray-800">{recommendation?.queryTitle}</td>
                           <td className="px-4 py-3 text-gray-800">{recommendation?.productName}</td>
                           <td className="px-4 py-3 text-center">
                              <button onClick={() => handleDeleteRecommendation(recommendation._id, recommendation?.queryId)} className="btn btn-circle  bg-transparent hover:bg-red-200 border-none">
                                 <MdDeleteForever className="text-red-600 text-base lg:text-2xl" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Myrecommendations;