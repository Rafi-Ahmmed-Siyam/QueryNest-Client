import React, { useContext, useState } from 'react';
import signIn from '../../assets/Auth/signIn.jpg'
import logo from '../../assets/MainIcon.png'
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import AuthContext from '../../Contexts/AuthContext';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';




const SignIn = () => {
   const navigate = useNavigate();
   const location = useLocation()
   const [showPassword, setShowPassword] = useState(false);
   const { userSignin, googleLogin } = useAuth();
   const from = location.state?.from?.pathname || '/';
   const handleSignin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      try {
         await userSignin(email, password);
         form.reset();
         navigate(from, { replace: true })
         toast.success('Signed in successfully! Welcome back!')
      } catch (err) {
         toast.error(err.message)
      }

   }
   const handleGoogle = async () => {
      try {
         await googleLogin();
         location.state ? navigate(location.state) : navigate('/')
         toast.success('Signed in successfully! Welcome back!')
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div className='flex justify-center items-center min-h-[calc(100vh-391px)] pt-20 pb-10 px-4'>
         <div className="w-full max-w-4xl flex shadow-2xl rounded-lg overflow-hidden bg-white">

            {/* Right side with form */}
            <div className="w-full md:w-1/2 p-8">
               <div>
                  <img className='w-12 mx-auto' src={logo} alt="Logo" />
                  <h2 className='text-xl text-gray-800 text-center mt-2'>Welcome Back</h2>
                  <div className='mt-4'>
                     <button onClick={handleGoogle} className='btn w-full text-base py-6 text-gray-800 bg-white hover:bg-gray-50 rounded-md'>
                        <FcGoogle className='text-2xl' />Sign in With Google
                     </button>
                  </div>
               </div>

               <div className="divider mt-6 text-sm">OR LOGIN WITH EMAIL</div>

               <form onSubmit={handleSignin} className="fieldset">

                  <div className='mt-2'>
                     <label className="label mb-1.5 font-medium text-sm  text-gray-800">Email</label>
                     <input required name='email' type="email" className="input w-full rounded-md" />
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
                  <div><Link to={'/passReset'} className="link link-hover text-red-600 font-medium">Forgot password?</Link></div>

                  <button className="btn btn-neutral mt-4 rounded-md bg-[#0EA5E9] text-gray-800 border-none py-4">Signin</button>
               </form>

               <div className="divider mt-4">
                  <span>Or <Link to="/signUp" className='hover:text-blue-500 text-sm font-medium'>Signup</Link></span>
               </div>
            </div>

            <div
               className="w-1/2 bg-cover bg-center hidden md:hidden lg:block"
               style={{ backgroundImage: `url(${signIn})` }}
            >
            </div>

         </div>
      </div>
   );
};

export default SignIn;