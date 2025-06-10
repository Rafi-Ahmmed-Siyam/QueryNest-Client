import React from 'react';
import { data, useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { timeDateFormater } from '../Utilities/DateTimeFormater';

const QueryDetails = () => {
   const { id } = useParams();
   // const { user } = useAuth();
   // console.log(id)

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
      <div className="py-10 px-4 lg:px-8 max-w-2xl  lg:max-w-2xl mx-auto">
         {/* Title */}
         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {queryTitle}
         </h1>

         {/* Content Card */}
         <div className="shadow-xl rounded-xl p-6 lg:p-8 bg-gray-100">
            {/* Image */}
            <img
               src={productImg}
               alt={productName}
               // className="mx-w-[400px] max-h-[350px] mx-auto object-cover rounded-md mb-6"
               className="w-full md:w-60 rounded-xl object-cover mx-auto mb-6"
            />

            {/* Details */}
            <div className="space-y-4 text-gray-800">
               <h2 className="text-2xl font-semibold">{productName}</h2>
               <p><span className="font-medium">Brand:</span> {productBrand}</p>
               <p><span className="font-medium">Category:</span> {queryCategory}</p>
               <p><span className="font-medium">Query:</span> {queryTitle}</p>
               <p><span className="font-medium">Boycotting Reason:</span> {boycottingReason}</p>
               <p><span className="font-medium">Recommendation Count:</span> {queryPoster?.recommendationCount}</p>
               <p className="text-sm text-gray-500"><span className="font-medium">Posted on: </span>{timeDateFormater(queryPoster?.currentDateAndTime)}</p>
            </div>
         </div>
      </div>
   );
};

export default QueryDetails;