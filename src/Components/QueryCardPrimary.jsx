import React from 'react';
import { timeDateFormater } from '../Utilities/DateTimeFormater';
import { Link } from 'react-router-dom';

const QueryCardPrimary = ({ query }) => {

   const { _id, productName, productBrand, productImg, queryTitle, queryCategory, boycottingReason, queryPoster } = query;

   return (
      <div className="card bg-gray-100 shadow-xl w-full border max-h-[600px]">
         <figure>
            <img

               src={productImg}
               alt={productName}
               className="p-4 rounded-3xl max-h-[350px]"
            />
         </figure>

         <div className="card-body">
            <h2 className="card-title">
               {productName}
               
               <div className="badge badge-info">{productBrand}</div>
            </h2>

            <p className="text-gray-800 font-medium">{queryTitle}</p>

            <div className="mt-1">
               <span className="badge badge-outline">{queryCategory}</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
               <div className="avatar">
                  <div className="w-10 rounded-full">
                     <img referrerPolicy='no-referrer' src={queryPoster?.photo} alt={queryPoster?.name} />
                  </div>
               </div>
               <div>
                  <p className="text-sm font-semibold">{queryPoster?.name}</p>
                  <p className="text-xs text-gray-400">
                     {
                        timeDateFormater(queryPoster?.currentDateAndTime)
                     }
                  </p>
               </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
               <div className="text-sm font-semibold text-gray-700">
                  Recommendation Count : {queryPoster?.recommendationCount}
               </div>
               <Link to={`/recommendation/${_id}`} className="btn btn-sm bg-blue-600 hover:bg-[#265FC5] text-white">
                  Recommend
               </Link>
            </div>
         </div>
      </div>
   );
};

export default QueryCardPrimary;