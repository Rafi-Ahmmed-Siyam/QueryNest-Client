import React, { useState } from 'react';
import signIn from '../../assets/Auth/signIn.jpg'
import logo from '../../assets/MainIcon.png'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
   return (
      <div className='flex justify-center items-center min-h-[calc(100vh-391px)] pt-20 pb-10 px-4'>
         <div className="w-full max-w-4xl flex shadow-2xl rounded-lg overflow-hidden bg-white">

            {/* Right side with form */}
            <div className="w-full md:w-1/2 p-8">
               <div>
                  <img className='w-12 mx-auto' src={logo} alt="Logo" />
                  <h2 className='text-xl text-gray-800 text-center mt-2'>Welcome Back</h2>
                  <div className='mt-4'>
                     <button className='btn w-full text-base py-6 text-gray-800 bg-white hover:bg-gray-50 rounded-md'>
                        <FcGoogle className='text-2xl' />Sign in With Google
                     </button>
                  </div>
               </div>

               <div className="divider mt-6 text-sm">OR LOGIN WITH EMAIL</div>

               <form className="fieldset">

                  <div className='mt-2'>
                     <label className="label mb-1.5 font-medium text-sm  text-gray-800">Email</label>
                     <input name='email' type="email" className="input w-full rounded-md" />
                  </div>
                  <div className='mt-2 relative'>
                     <label className="label mb-1.5 font-medium text-sm  text-gray-800">Password</label>
                     <input type={showPassword? 'text' : 'password'} className="input w-full rounded-md" />
                     <button
                        onClick={() => setShowPassword(!showPassword)}
                        type='button'
                        className='btn btn-circle border-none bg-transparent absolute left-[340px] z-10'>
                        {(showPassword) ? <FaEye className='text-xl' /> : <FaEyeSlash className='text-xl' />}
                     </button>
                  </div>

                  <button className="btn btn-neutral mt-4 rounded-md bg-[#0EA5E9] text-gray-800 border-none py-4">Signin</button>
               </form>

               <div className="divider mt-4">
                  <span>Or <Link to="/signUp" className='hover:text-blue-500 text-sm font-medium'>Signup</Link></span>
               </div>
            </div>

            <div
               className="w-1/2 bg-cover bg-center hidden md:block"
               style={{ backgroundImage: `url(${signIn})` }}
            >
               {/* Optional: Gradient overlay */}
               {/* <div className="w-full h-full bg-gradient-to-r from-black/50 to-transparent"></div> */}
            </div>

         </div>
      </div>
   );
};

export default SignIn;