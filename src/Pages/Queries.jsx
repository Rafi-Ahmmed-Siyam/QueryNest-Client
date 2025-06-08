import React from 'react';
import AllQueryHeading from '../Components/AllQueryHeading';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { useQuery } from '@tanstack/react-query';
import QueryCardPrimary from '../Components/QueryCardPrimary';

const Queries = () => {
   const { data: queries, isPending, isFetching } = useQuery({
      queryKey: ['allQuries'],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/queries`);
         return data;
      },
   });

   if(isPending) return <Spinner/>
   

   return (
      <div className='max-w-[1450px] mx-auto'>
         <AllQueryHeading length={queries?.length} />

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 lg:px-0 pb-10'>
            {
               queries.map(query=><QueryCardPrimary key={query._id} query={query}/>)
            }
         </div>
      </div>
   );
};

export default Queries;