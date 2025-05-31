import React, { useState } from 'react';
import signUp from '../../assets/Auth/signUp.jpg'
import logo from '../../assets/MainIcon.png'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const SignUp = () => {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const { createUser, googleLogin, updateuserProfile } = useAuth();

   const handleSignUp = async (e) => {
      e.preventDefault()
      const form = e.target;
      const userName = form.username.value;
      const email = form.email.value;
      const photoUrl = form.photoUrl.value;
      const password = form.password.value;

      setError("")

      if (password.length < 6) {
         setError("Password must be at least 6 characters long.")
         return
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
      if (!passwordRegex.test(password)) {
         setError("Password must include at least one lowercase letter (a–z) and one uppercase letter (A–Z).")
         return
      }

      try {
         await createUser(email, password);
         await updateuserProfile(userName, photoUrl);
         form.reset();
         toast.success('Signup successful! Let’s get started!')
         navigate('/')
      }
      catch (err) {
         toast.error(err.message);
      }
   }

   const handleGoogle = async () => {
      try {
         await googleLogin();
         toast.success('Signup successful! Let’s get started!')
         navigate('/')
      } catch (err) {
         toast.error(err.message);
      }
   }


   return (
      <div className='pt-20 pb-10'>
         <div className='flex justify-center items-center min-h-[calc(100vh-391px)]  '>
            <div className="w-full max-w-4xl flex shadow-2xl rounded-lg overflow-hidden bg-white">

               {/* Right side with form */}
               <div className="w-full md:w-1/2 p-8 ">
                  <div>
                     <img className='w-12 mx-auto' src={logo} alt="Logo" />
                     <h2 className='text-xl text-gray-800 text-center mt-2'>Get Your Free Account Now</h2>
                     <div className='mt-4'>
                        <button onClick={handleGoogle} className='btn w-full text-base py-6 text-gray-800 bg-white hover:bg-gray-50 rounded-md'>
                           <FcGoogle className='text-2xl' />Sign in With Google
                        </button>
                     </div>
                  </div>

                  <div className="divider mt-6 text-sm">OR REGISTER WITH EMAIL</div>
                  {/* Form Div */}

                  <form onSubmit={handleSignUp} className="fieldset">
                     <div>
                        <label className="label mb-1.5 font-medium  text-sm text-gray-800">Username</label>
                        <input name='username' type="text" className="input w-full rounded-md" />
                     </div>
                     <div className='mt-2'>
                        <label className="label mb-1.5 font-medium text-sm  text-gray-800">Email</label>
                        <input required name='email' type="email" className="input w-full rounded-md" />
                     </div>
                     <div className='mt-2'>
                        <label className="label mb-1.5 font-medium text-sm  text-gray-800">Photo URL</label>
                        <input name='photoUrl' type="url" className="input w-full rounded-md" />
                     </div>
                     <div className='mt-2 relative'>
                        <label className="label mb-1.5 font-medium text-sm text-gray-800">Password</label>
                        <input
                           required
                           name='password'
                           type={showPassword ? 'text' : 'password'}
                           className="input w-full pr-12 rounded-md"
                        />
                        <button
                           onClick={() => setShowPassword(!showPassword)}
                           type='button'
                           className='absolute right-3 top-11 -translate-y-1/2 z-10 bg-transparent'
                        >
                           {showPassword ? <FaEye className='text-xl' /> : <FaEyeSlash className='text-xl' />}
                        </button>
                     </div>
                     {/* error msg */}
                     {
                        (error) && <label className="text-sm text-red-400 text-center mt-2.5 break-words max-w-sm">
                           {error}
                        </label>
                     }

                     <button className="btn btn-neutral mt-4 rounded-md bg-[#0EA5E9] text-gray-800 border-none py-4">Signup</button>
                  </form>


                  <div className="divider mt-4">
                     <span>Or <Link to="/signIn" className='hover:text-blue-500 text-sm font-medium'>Signin</Link></span>
                  </div>
               </div>

               <div
                  className="w-1/2 bg-cover bg-center hidden md:block"
                  style={{ backgroundImage: `url(${signUp})` }}
               >

               </div>

            </div>
         </div>
      </div>
   );
};

export default SignUp;