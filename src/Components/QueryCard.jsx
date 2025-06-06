import React from 'react';
import { FcViewDetails } from "react-icons/fc";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const QueryCard = ({ query, handleDeleteQuery }) => {
   const { _id, productName, productBrand, productImg, queryTitle, queryCategory, boycottingReason } = query;
   // console.log(_id)
   return (
      <div className="h-full">
         <div className="card bg-gray-100 border h-full flex flex-col justify-between rounded-xl shadow-sm">
            <figure className=' rounded-t-xl overflow-hidden'>
               <img
                  className='p-4 rounded-3xl max-h-[350px]'
                  src={productImg}
                  alt="Product"
               />
            </figure>
            <div className="card-body flex flex-col flex-grow">
               <h2 className="card-title">{productName}</h2>
               <p className="flex-grow">{boycottingReason.substring(0,80)}...</p>
               <div className="card-actions justify-start lg:justify-end mt-4">
                  <Link to={`/details/${_id}`} className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
                     <FcViewDetails className='text-base text-gray-600' />View Details
                  </Link>
                  <Link to={`/updateQuery/${_id}`} className="btn btn-sm bg-slate-200 hover:bg-slate-300 text-gray-700">
                     <RxUpdate className='text-base text-white' />Update
                  </Link>
                  <button onClick={() => handleDeleteQuery(_id)} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">
                     <MdDelete  className='text-base text-white' />Delete
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default QueryCard;