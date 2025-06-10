import React from 'react';
import { Link } from 'react-router-dom';
import MyQueryBanner from '../Components/MyQueryBanner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Spinner from '../Components/Spinner';
import QueryCard from '../Components/QueryCard';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const MyQueries = () => {
   const queryClient = useQueryClient();
   const { user } = useAuth();
   const axiosInstance = useAxiosSecure();

   const { data: queries, isLoading, isError, error } = useQuery({
      queryKey: ['userQuery', user?.email],
      queryFn: async () => {
         const { data } = await axiosInstance.get(`${import.meta.env.VITE_URL}/queries/${user?.email}`);
         return data
      }
   })

   const { mutateAsync } = useMutation({
      mutationFn: async (id) => {
         const { data } = await axiosInstance.delete(`${import.meta.env.VITE_URL}/delete-query/${id}`)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['userQuery'] });

      },
      onError: () => {
         toast.error("Something went wrong")
      }
   })


   const handleDeleteQuery = async (id) => {

      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         background: "#E0F2FE",
         showCancelButton: true,
         confirmButtonColor: "#28A745",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
         color: ""
      }).then(async (result) => {
         if (result.isConfirmed) {
            await mutateAsync(id);

            Swal.fire({
               background: "#ECFDF5",
               title: "Deleted!",
               text: "Your query has been deleted.",
               icon: "success"
            });
         }
      });

   }

   if (isLoading) return <Spinner />
   if (isError) return <div className='text-red-500 flex justify-center items-center min-h-[calc(100vh-391px)]'><p>Error: {error.message}</p></div>;


   return (
      <div>
         <MyQueryBanner />
         <section>

            {
               (queries.length === 0) ? (<div className="text-center mt-12 text-gray-500">
                  <h3 className="text-xl font-semibold">No Queries Found</h3>
                  <p className="mt-2">You haven’t posted any queries yet. Please click the Add Query button to add your first query.</p>

               </div>)
                  :
                  (<div className='max-w-[1500px] mx-auto'>
                     <h2 className="text-gray-800 text-start text-xl lg:text-2xl font-bold mt-8 ml-5 lg:ml-11">
                        All Your Posted Queries <div className="badge badge-soft badge-primary">{queries?.length} {queries?.length <= 1 ? "Query" : "Queries"}</div>
                     </h2>
                     <div>
                        <div className=' mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-10 py-8'>
                           {
                              queries.map(query => <QueryCard key={query._id} query={query} handleDeleteQuery={handleDeleteQuery} />)
                           }
                        </div>
                     </div>
                  </div>
                  )
            }


         </section>
      </div>
   );
};

export default MyQueries; <h2>This is my qurries</h2>