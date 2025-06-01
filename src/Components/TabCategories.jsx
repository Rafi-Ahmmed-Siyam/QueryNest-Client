import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const TabCategories = () => {
   return (
      <div className='mt-10'>
         <div className='mb-9'>
            <h2 className='text-center font-semibold text-black text-2xl md:text-3xl lg:text-3xl'>Explore Electronics Queries by Category</h2>
            <p className='mt-5 text-center text-gray-900 text-sm lg:text-base mx-auto max-w-[25rem] md:max-w-2xl lg:max-w-6xl'>Find answers and share your thoughts on popular gadgets. Browse queries by category—like mobile phones, audio devices, computer accessories, and smartwatches—to get real insights and helpful tips from other users.

            </p>
         </div>
         {/* Tab div */}
         <div className='container mx-auto'>
            <Tabs>
               <TabList className="border-b-[2.5px] border-cyan-400"> {/* Default underline with thicker border */}
                  <div className="flex justify-center items-center gap-0 lg:gap-1 px-10">
                     <Tab className="react-tabs__tab"
                        selectedClassName="react-tabs__tab--selected !font-medium !text-[#1F2937] !bg-cyan-400">
                        Mobile Phones
                     </Tab>
                     <Tab className="react-tabs__tab border-2 border-gray-400 "
                        selectedClassName="react-tabs__tab--selected !font-medium !text-[#1F2937] !bg-cyan-400"
                     >
                        Audio Devices
                     </Tab>
                     <Tab className="react-tabs__tab border-2 border-gray-400"
                        selectedClassName="react-tabs__tab--selected !font-medium !text-[#1F2937] !bg-cyan-400"
                     >
                        Computer Accessories
                     </Tab>
                     <Tab className="react-tabs__tab border-2 border-gray-400"
                        selectedClassName="react-tabs__tab--selected !font-medium !text-[#1F2937] !bg-cyan-400"
                     >
                        Wearable Watches
                     </Tab>
                  </div>
               </TabList>
               <TabPanel>Mobile Phones</TabPanel>
               <TabPanel>Audio Devices</TabPanel>
               <TabPanel>Computer Accesories</TabPanel>
               <TabPanel>Wearable Watches</TabPanel>
            </Tabs>
         </div>
      </div>
   );
};

export default TabCategories;