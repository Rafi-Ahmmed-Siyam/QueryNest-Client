import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const Recommendation = () => {
   const { id } = useParams();


   const { data: queryData, isLoading } = useQuery({
      queryKey: ['query', id],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/query/${id}`)
         return data;
      }
   })



   if (isLoading) return <Spinner />
   const { _id, productName, productBrand, productImg, queryTitle, queryCategory, boycottingReason, queryPoster } = queryData;

   return (
      <div className="max-w-5xl mx-auto px-4 py-8">
         {/* Query Header */}
         <div className="bg-gray-100 rounded-2xl shadow-lg p-6 md:flex items-start gap-6 ">
            <img
               referrerPolicy='no-referrer'
               src={productImg}
               alt={productName}
               className="w-full md:w-60 rounded-xl object-cover"
            />
            <div className="flex-1 space-y-3 mt-8 md:mt-0 lg:mt-2.5">
               <h2 className="text-2xl font-bold text-black">
                  {queryTitle}
               </h2>
               <p className="text-sm font-semibold text-gray-900 ">Category: <span className="badge badge-outline">{queryCategory}</span></p>
               <p className="text-sm text-gray-900 "><span className="font-medium">Product Name:</span> {productName}</p>
               <div className="text-sm text-gray-900 flex items-center gap-2">
                  <span className="font-medium">Brand:</span>
                  <div className="badge badge-info text-black">{productBrand}</div>
               </div>
               <p className="text-sm text-gray-900 "><span className="font-medium">Reason:</span> {boycottingReason}</p>
            </div>
         </div>

         {/* User Info */}
         <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <img
               referrerPolicy='no-referrer'
               src={queryPoster.photo}
               alt={queryPoster.name}
               className="w-14 h-14 rounded-full object-cover"
            />
            <div >
               <p className="font-medium text-gray-800 dark:text-white">{queryPoster.name}</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">{queryPoster.email}</p>
            </div>
         </div>

         {/* Recommendation Form */}
         <div className="mt-10 bg-gray-100 shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-black mb-4 text-center ">Add a Recommendation</h3>
            <form className="space-y-4">
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-800 ">Recommendation Title</label>
                  <input type="text" placeholder="Enter title" className="w-full p-3 rounded-lg border border-gray-300  bg-gray-50 text-black" />
               </div>
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-800">Recommended Product Name</label>
                  <input type="text" placeholder="Product name" className="w-full p-3 rounded-lg border border-gray-300  bg-gray-50 text-black" />
               </div>
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-800">Product Image URL</label>
                  <input type="text" placeholder="Image URL" className="w-full p-3 rounded-lg border border-gray-300  bg-gray-50 text-black" />
               </div>
               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-800">Why do you recommend?</label>
                  <textarea rows="4" placeholder="Write reason here..." className=" p-3 bg-gray-50 border border-gray-300 w-full resize-none rounded-lg" />
               </div>
               <div className='flex justify-end'>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold">
                     Add Recommendation
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Recommendation;