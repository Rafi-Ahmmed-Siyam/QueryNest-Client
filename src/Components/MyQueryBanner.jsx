import React from 'react';
import { Link } from 'react-router-dom';

const MyQueryBanner = () => {
   return (
      <div className="bg-gradient-to-r from-[#3A80F3] to-[#6C63FF] min-h-[250px] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 rounded-md shadow-md">
         {/* Left Content */}
         <div className="text-center lg:text-left">
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
               Welcome to Your Queries
            </h1>
            <p className="text-white max-w-xl text-sm lg:text-base">
               Easily manage all the queries you've posted. You can view, edit, and remove them, or add new queries to get personalized recommendations.
            </p>
         </div>

         {/* Right Button */}
         <div className="mt-6 lg:mt-0">
            <Link to="/addQueries">
               <button className="bg-white text-[#3A80F3] hover:text-white hover:bg-[#265FC5] font-semibold px-6 py-3 rounded-md shadow-md transition duration-300 cursor-pointer">
                  ➕ Add New Query
               </button>
            </Link>
         </div>
      </div>
   );
};

export default MyQueryBanner;