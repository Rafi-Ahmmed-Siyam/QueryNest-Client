import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import logo from '../assets/MainIcon.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const UpdateQuery = () => {
   const { id } = useParams();
   const { user } = useAuth();
   const axiosInstance = useAxiosSecure()
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { data: queryData, isLoading } = useQuery({
      queryKey: ['query', id],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_URL}/query/${id}`)
         return data;
      }
   })


   const { mutateAsync } = useMutation({
      mutationFn: async (updateQueryData) => {
         const { data } = await axiosInstance.put(`${import.meta.env.VITE_URL}/update-query/${id}`, updateQueryData);
         // console.log(data)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['userQuery'] });
         queryClient.invalidateQueries({ queryKey: ['query', id] });
         toast.success('Query updated successfully!');
         navigate('/myQueries')
      },
      onError: () => {
         // console.log("Error Found")
         toast.error('Failed to update query. Please try again.')
      }

   })

   if (isLoading) return <Spinner />
   const { _id, productName, productBrand, productImg, queryTitle, queryCategory, boycottingReason, queryPoster } = queryData;

   const handleAddQuery = async (e) => {
      e.preventDefault();
      const form = e.target;
      const productName = form.productName.value.trim();
      const productBrand = form.productBrand.value.trim();
      const productImg = form.imgURL.value.trim();
      const queryTitle = form.queryTitle.value.trim();
      const queryCategory = form.queryCategory.value.trim();
      const boycottingReason = form.boycottingReason.value.trim();
      const recommendationCount = queryPoster?.recommendationCount || 0;
      const currentDateAndTime = new Date();

      const updateQueryData = {
         productName,
         productBrand,
         productImg,
         queryTitle,
         queryCategory,
         boycottingReason,
         queryPoster: {
            email: user?.email,
            name: user?.displayName,
            photo: user?.photoURL,
            currentDateAndTime,
            recommendationCount,
         }
      }

      const isChange = productName !== queryData.productName ||
         productBrand !== queryData.productBrand ||
         productImg !== queryData.productImg ||
         queryTitle !== queryData.queryTitle ||
         queryCategory !== queryData.queryCategory ||
         boycottingReason !== queryData.boycottingReason;
         

      if(!isChange) return  toast('No changes detected! Please update at least one field.', { icon: '⚠️' });


      mutateAsync(updateQueryData);
   }



   return (
      <div className='py-14 px-1.5'>
         {/* Text div */}
         <div>
            <div>
               <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 text-center">
                  Update Your Query
               </h1>
               <p className='text-center text-sm lg:text-base max-w-2xl mx-auto mt-3.5 text-gray-700'>Make changes to your previously submitted query below. You can modify the title, description, or any other relevant information. After updating, click the "Save Changes" button to apply the updates.

               </p>
            </div>

            <div className='s'>
               {/* Form Div */}
               <div className='flex justify-center items-center mt-9'>
                  <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl rounded-md">
                     <div className="card-body">
                        <div className='mb-2.5'>
                           <img className='w-10 mx-auto' src={logo} alt="" />
                           <h3 className='text-center font-medium text-base mt-2.5'>Explore ideas. Share confidently.</h3>
                        </div>
                        {/* Add query Form */}
                        <form onSubmit={handleAddQuery} className="fieldset">
                           {/* div1 */}
                           <div className='flex gap-2.5 lg:gap-3 items-center'>
                              <div className='flex-1'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Product Name</label>
                                 <input required defaultValue={productName} name='productName' type="text" className="input w-full rounded-md" placeholder='Add Product Name' />
                              </div>
                              <div className='flex-1'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Product Brand</label>
                                 <input defaultValue={productBrand} name='productBrand' type="text" className="input w-full rounded-md" placeholder='Add Product Brand' />
                              </div>
                           </div>
                           {/* div2 */}
                           <div className='flex gap-2.5 lg:gap-3 items-center mt-2.5'>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Product Image URL</label>
                                 <input defaultValue={productImg} required name='imgURL' type="url" className="input w-full rounded-md" placeholder='Add Image URL' />
                              </div>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Query Title</label>
                                 <input defaultValue={queryTitle} required name='queryTitle' type="text" className="input w-full rounded-md" placeholder='Briefly Describe Your Question Here' />

                              </div>
                           </div>

                           {/* div3 */}
                           <div className='flex gap-2.5 lg:gap-3 items-center mt-2.5'>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Category</label>
                                 <select name='queryCategory' required defaultValue={queryCategory} className="select w-full rounded-md">
                                    <option disabled={true}>Select a Category</option>
                                    <option>Mobile Phones</option>
                                    <option>Audio Devices</option>
                                    <option>Computer Accessories</option>
                                    <option>Wearable Watches</option>
                                 </select>
                              </div>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">User Email</label>
                                 <input value={user?.email || ""} disabled name='userEmail' type="email" className="input w-full rounded-md " />
                              </div>
                           </div>
                           <div className='mt-2.5'>
                              <label className="label mb-2 font-medium  text-sm text-gray-800 ">Boycotting Reason Details</label>
                              <textarea defaultValue={boycottingReason} name='boycottingReason' className="textarea w-full resize-none rounded-md" placeholder="Share the Reason for Boycotting this Product"></textarea>
                           </div>
                           <button className="btn btn-neutral mt-4 w-full rounded-md">Update Query</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateQuery;