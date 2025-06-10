import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { useQuery } from '@tanstack/react-query';
import QueryCardPrimary from '../Components/QueryCardPrimary';
import { ScaleLoader } from 'react-spinners';
import { useDebounce } from 'use-debounce';

const Queries = () => {
   const [searchInput, setSearchInput] = useState('');
   const [debounceText] = useDebounce(searchInput.trim(),500)
   
   const { data: queries = [], isLoading } = useQuery({
      queryKey: ['allQueries', debounceText],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/allQueries?search=${debounceText}`);
         return data;
      },
   });

   return (
      <div className='max-w-[1450px] mx-auto'>
         <div>
            <div className='pt-8'>
               <h2 className="text-2xl md:text-3xl font-semibold text-center text-black">
                  All Public Queries
               </h2>
               <p className="text-center text-gray-900 mt-4 max-w-3xl mx-auto px-4">
                  Browse through all questions posted by users across various tech categories. Find solutions, give answers, or explore ideas shared by the community.
               </p>
            </div>

            {/* Filter/Search Row */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2 mt-9">
               <div>
                  <h2 className="text-base lg:text-xl font-semibold text-gray-800">
                     Total Queries : <div className="badge badge-soft badge-primary">{queries?.length}</div>
                  </h2>
               </div>

               {/* Search Input */}
               <div className="w-[300px] lg:w-[350px] mx-auto">
                  <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div class="relative">
                     <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                     </div>
                     <input value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-black " placeholder="Search by Product Name....." required />
                     <button type="submit" class="text-white absolute end-2.5 bottom-2.5 hover:bg-blue-00 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer font-medium rounded-lg text-sm px-4 py-2 bg-blue-500 ">Search</button>
                  </div>
               </div>

               {/* Layout toggle buttons */}
               <div className='hidden md:block lg:block'>
                  <div className="flex items-center gap-2">
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5]">1 Col</button>
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5]">2 Col</button>
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5] hidden md:hidden lg:block">3 Col</button>
                  </div>
               </div>
            </div>
         </div>

         {/* Spinner */}
         {isLoading && <Spinner />}

         {/* Query Cards */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 lg:px-0 pb-10'>
            {
               queries.map(query => <QueryCardPrimary key={query._id} query={query} />)
            }
         </div>
      </div>
   );
};

export default Queries;
