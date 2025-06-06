import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Spinner from './Spinner';
import QueryCardPrimary from './QueryCardPrimary';

const TabCategories = () => {
   const categories = [
      "Mobile Phones",
      "Audio Devices",
      "Computer Accessories",
      "Wearable Watches"
   ];

   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
   const [tabIndex, setTabIndex] = useState(0);

   const { data: queries = [], isPending,isFetching } = useQuery({
      queryKey: ['sectionQueries', selectedCategory],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/queries?home=true&category=${encodeURIComponent(selectedCategory)}`);
         return data;
      },
      keepPreviousData: true
   });

   if (isPending) return <Spinner />;
   if(isFetching) return <Spinner/>
   return (
      <div className='mt-10'>
         <div className='mb-9'>
            <h2 className='text-center font-semibold text-black text-2xl md:text-3xl lg:text-3xl'>
               Explore Electronics Queries by Category
            </h2>
            <p className='mt-5 text-center text-gray-900 text-sm lg:text-base mx-auto max-w-[25rem] md:max-w-2xl lg:max-w-6xl'>
               Find answers and share your thoughts on popular gadgets. Browse queries by category—like mobile phones, audio devices, computer accessories, and smartwatches—to get real insights and helpful tips from other users.
            </p>
         </div>

         <div className='container mx-auto'>
            <Tabs
               selectedIndex={tabIndex}
               onSelect={(index) => {
                  setTabIndex(index);
                  setSelectedCategory(categories[index]);
               }}
            >
               <TabList className="border-b-[2.5px] max-w-[1350px] mx-auto border-cyan-400">
                  <div className="flex justify-center items-center gap-0 lg:gap-1 px-10">
                     {categories.map((cat, idx) => (
                        <Tab
                           key={idx}
                           className="react-tabs__tab border-2 border-gray-400"
                           selectedClassName="react-tabs__tab--selected !font-medium !text-[#1F2937] !bg-cyan-400"
                        >
                           {cat}
                        </Tab>
                     ))}
                  </div>
               </TabList>

               <div className='max-w-[1300px] mx-auto px-2.5 lg:px-0'>
                  {categories.map((_, idx) => (
                     <TabPanel key={idx}>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 justify-center'>
                           {queries.map(query => (
                              <QueryCardPrimary key={query._id} query={query} />
                           ))}
                        </div>
                     </TabPanel>
                  ))}
               </div>
            </Tabs>
         </div>
      </div>
   );
};

export default TabCategories;
