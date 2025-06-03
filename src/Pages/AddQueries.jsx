import { useNavigate } from 'react-router-dom';
import logo from '../assets/MainIcon.png'
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';



const AddQueries = () => {
   const { user } = useAuth();
   const navigate = useNavigate();

   const handleAddQuery = async (e) => {
      e.preventDefault();
      const form = e.target;
      const productName = form.productName.value;
      const productBrand = form.productBrand.value;
      const productImg = form.imgURL.value;
      const queryTitle = form.queryTitle.value;
      const queryCategory = form.queryCategory.value;
      const boycottingReason = form.boycottingReason.value;
      const recommendationCount = 0;
      const currentDateAndTime = new Date();
      const queryPostData = {
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

      try {
         await axios.post(`${import.meta.env.VITE_URL}/add-query`, queryPostData)
         form.reset();
         toast.success('Query Added Successfully!');
         navigate('/myQueries')

      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='py-14 px-1.5'>
         {/* Text div */}
         <div>
            <div>
               <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 text-center">
                  Add a New Query
               </h1>
               <p className='text-center text-sm lg:text-base max-w-2xl mx-auto mt-3.5 text-gray-700'>Share your tech-related questions here. Whether it’s about phones, audio devices, or accessories, ask now and get helpful answers from fellow users.</p>
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
                                 <input required name='productName' type="text" className="input w-full rounded-md" placeholder='Add Product Name' />
                              </div>
                              <div className='flex-1'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Product Brand</label>
                                 <input name='productBrand' type="text" className="input w-full rounded-md" placeholder='Add Product Brand' />
                              </div>
                           </div>
                           {/* div2 */}
                           <div className='flex gap-2.5 lg:gap-3 items-center mt-2.5'>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Product Image URL</label>
                                 <input required name='imgURL' type="url" className="input w-full rounded-md" placeholder='Add Image URL' />
                              </div>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Query Title</label>
                                 <input required name='queryTitle' type="text" className="input w-full rounded-md" placeholder='Briefly Describe Your Question Here' />

                              </div>
                           </div>

                           {/* div3 */}
                           <div className='flex gap-2.5 lg:gap-3 items-center mt-2.5'>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">Category</label>
                                 <select name='queryCategory' required defaultValue="Select a Category" className="select w-full rounded-md">
                                    <option disabled={true}>Select a Category</option>
                                    <option>Mobile Phones</option>
                                    <option>Audio Devices</option>
                                    <option>Computer Accessories</option>
                                    <option>Wearable Watches</option>
                                 </select>
                              </div>
                              <div className='flex-1/2'>
                                 <label className="label mb-2 font-medium  text-sm text-gray-800">User Email</label>
                                 <input value={user?.email} disabled name='userEmail' type="email" className="input w-full rounded-md " />
                              </div>
                           </div>
                           <div className='mt-2.5'>
                              <label className="label mb-2 font-medium  text-sm text-gray-800 ">Boycotting Reason Details</label>
                              <textarea name='boycottingReason' className="textarea w-full resize-none rounded-md" placeholder="Share the Reason for Boycotting this Product"></textarea>
                           </div>
                           <button className="btn btn-neutral mt-4 w-full rounded-md">Add Query</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddQueries; <h2>Add queries.jsx</h2>