import React from 'react';

const AllQueryHeading = ({ length }) => {
   const handleSearch = (e) => {
      console.log(e.terget.search.value)
   }
   return (
      <div>
         <div >
            <div className='pt-8'>
               <h2 className="text-2xl md:text-3xl font-semibold text-center text-black">
                  All Public Queries
               </h2>
               <p className="text-center text-gray-900 mt-4 max-w-3xl mx-auto px-4">
                  Browse through all questions posted by users across various tech categories. Find solutions, give answers, or explore ideas shared by the community.
               </p>
            </div>
            {/* Under heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2 mt-9">
               {/* Left: Page Heading */}
               <div>
                  <h2 className="text-base lg:text-xl font-semibold text-gray-800">
                     Total Queries : <div className="badge badge-soft badge-primary">{length}</div>
                  </h2>
               </div>

               <div className="w-[250px] lg:w-[350px] mx-auto">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                     Search
                  </label>
                  <div className="relative">
                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                           className="w-4 h-4 text-gray-500 dark:text-gray-400"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 20 20"
                        >
                           <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                           />
                        </svg>
                     </div>
                     <input
                        onChange={handleSearch}
                        name="search"
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Product by Name"
                        required
                     />
                     <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                     >
                        Search
                     </button>
                  </div>
               </div>

               {/* Right: Layout Toggle Buttons */}
               <div className='hidden md:block lg:block'>
                  <div className="flex items-center gap-2 ">
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5]">1 Col</button>
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5]">2 Col</button>
                     <button className="btn bg-blue-500 text-white hover:bg-[#265FC5] hidden md:hidden lg:block">3 Col</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AllQueryHeading;