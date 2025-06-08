import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import { timeDateFormater } from '../Utilities/DateTimeFormater';

const Recommendation = () => {
   const queryClient = useQueryClient();
   const { id } = useParams();
   const { user } = useAuth();
   const [queryId, setQueryId] = useState(null);

   // Fetch query data
   const { data: queryData, isLoading } = useQuery({
      queryKey: ['query', id],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/query/${id}`);
         return data;
      }
   });

   // যখন queryData আসবে তখন queryId সেট করো
   useEffect(() => {
      if (queryData?._id) {
         setQueryId(queryData._id);
      }
   }, [queryData]);

   const { data: recommendations = [], isLoading: loadingRecommendations } = useQuery({
      queryKey: ['recommendations', queryId],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/recommendation/${queryId}`);
         return data;
      },
      enabled: !!queryId,
   });

   const { mutateAsync } = useMutation({
      mutationFn: async (recomenDationData) => {
         await axios.post(`${import.meta.env.VITE_URL}/add-recommendation`, recomenDationData);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['query', id] });
         queryClient.invalidateQueries({ queryKey: ['sectionQueries'] });
         queryClient.invalidateQueries({ queryKey: ['allQuries'] });
         queryClient.invalidateQueries({ queryKey: ['recommendations'] });
         toast.success("Thanks! Your recommendation has been recorded.");
      },
      onError: () => {
         toast.error("Something went wrong. Please try again.");
      }
   });

   if (isLoading) return <Spinner />;

   const { productName, productBrand, productImg, queryTitle, queryCategory, boycottingReason, queryPoster } = queryData || {};

   const handleRecommendation = async (e) => {
      e.preventDefault();
      const form = e.target;
      const recommendationTitle = form.recommendatinTitle.value;
      const recommendedProductName = form.recommendationProduct.value;
      const recommendedProductImageUrl = form.recoProductImgUrl.value;
      const recommendationReason = form.recommendationReason.value;

      const recomenDationData = {
         recommendationTitle,
         recommendedProductName,
         recommendedProductImageUrl,
         recommendationReason,
         recommenderEmail: user?.email,
         recommenderName: user?.displayName,
         recommenderImg: user?.photoURL,
         recommendedAt: new Date(),
         queryId,
         queryTitle,
         productName,
         queryCreator: queryPoster?.email,
         queryCreatorUserName: queryPoster?.name,
      };

      try {
         await mutateAsync(recomenDationData);
         form.reset();
      } catch (err) {
         // Error handling if needed
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 py-8 ">

         {/* Query Header */}
         <div className="bg-gray-100 rounded-2xl shadow-lg p-6 md:flex items-start gap-6">
            <img
               referrerPolicy="no-referrer"
               src={productImg}
               alt={productName}
               className="w-full md:w-60 rounded-xl object-cover"
            />
            <div className="flex-1 space-y-3 mt-8 md:mt-0 lg:mt-2.5">
               <h2 className="text-2xl font-bold text-black">{queryTitle}</h2>
               <p className="text-sm font-semibold text-gray-900">
                  Category: <span className="badge badge-outline">{queryCategory}</span>
               </p>
               <p className="text-sm text-gray-900">
                  <span className="font-medium">Product Name:</span> {productName}
               </p>
               <div className="text-sm text-gray-900 flex items-center gap-2">
                  <span className="font-medium">Brand:</span>
                  <div className="badge badge-info text-black">{productBrand}</div>
               </div>
               <p className="text-sm text-gray-900">
                  <span className="font-medium">Reason:</span> {boycottingReason}
               </p>
               <div className="flex justify-start gap-2.5 mt-2">
                  <img
                     referrerPolicy="no-referrer"
                     src={queryPoster?.photo}
                     alt={queryPoster?.name}
                     className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                     <p className="font-medium text-black">{queryPoster?.name}</p>
                     <p className="text-sm text-gray-500">{queryPoster?.email}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Combined Recommendations & Form in Two Columns */}
         <div className="mt-14 border-t border-gray-300 pt-10 ">
            <h3 className="text-2xl font-bold text-blue-700 text-center mb-10">
               Community Recommendations
            </h3>
            

            <div className="grid md:grid-cols-2 gap-6 items-start ">
               {/* Left Column - Recommendations */}
               <div>
                  {loadingRecommendations ? (
                     <p className="text-center text-gray-400">Loading recommendations...</p>
                  ) : recommendations.length === 0 ? (
                     <p className="text-center text-gray-500">No recommendations yet. Be the first to add one!</p>
                  ) : (
                     <div className="space-y-6">
                        {recommendations.map((rec) => (
                           <div
                              key={rec._id}
                              className="bg-white shadow-md p-5 rounded-2xl flex flex-col sm:flex-row gap-5 items-start"
                           >
                              <img
                                 src={rec.recommendedProductImageUrl}
                                 alt={rec.recommendedProductName}
                                 className="w-full sm:w-28 h-24 object-cover rounded-xl"
                              />
                              <div className="flex-1 space-y-1">
                                 <h4 className="text-base font-semibold text-blue-600">
                                    {rec.recommendationTitle}
                                 </h4>
                                 <p>
                                    <span className="font-medium">Recommended Product:</span>{' '}
                                    {rec.recommendedProductName}
                                 </p>
                                 <p>
                                    <span className="font-medium">Reason:</span> {rec.recommendationReason}
                                 </p>
                                 <div className="flex items-center gap-3 mt-2">
                                    <img
                                       src={rec.recommenderImg}
                                       alt={rec.recommenderName}
                                       className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                       <p className="text-sm font-medium">{rec.recommenderName}</p>
                                       <p className="text-xs text-gray-500">{timeDateFormater(rec?.recommendedAt)}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>

               {/* Right Column - Form */}
               <div className="bg-gray-100 shadow-xl rounded-2xl p-6 sticky top-28">
                  <h3 className="text-xl font-semibold text-black mb-4 text-center">
                     Add a Recommendation
                  </h3>
                  <form onSubmit={handleRecommendation} className="space-y-4">
                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800">
                           Recommendation Title
                        </label>
                        <input
                           required
                           name="recommendatinTitle"
                           type="text"
                           placeholder="Enter title"
                           className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-black"
                        />
                     </div>
                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800">
                           Recommended Product Name
                        </label>
                        <input
                           required
                           name="recommendationProduct"
                           type="text"
                           placeholder="Product name"
                           className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-black"
                        />
                     </div>
                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800">
                           Product Image URL
                        </label>
                        <input
                           required
                           name="recoProductImgUrl"
                           type="url"
                           placeholder="Image URL"
                           className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-black"
                        />
                     </div>
                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800">
                           Why do you recommend?
                        </label>
                        <textarea
                           name="recommendationReason"
                           rows="2"
                           placeholder="Write reason here..."
                           className="p-3 bg-gray-50 border border-gray-300 w-full resize-none rounded-lg"
                        />
                     </div>
                     <div className="flex justify-end">
                        <button
                           type="submit"
                           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
                        >
                           Add Recommendation
                        </button>
                     </div>
                  </form>
               </div>

               
            </div>
         </div>

      </div>

   );
};

export default Recommendation;
