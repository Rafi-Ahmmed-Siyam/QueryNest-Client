import React from 'react';
import logo from '../../assets/MainIcon.png'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PassResetPage = () => {
   const navigate = useNavigate()
   const handleReserPass = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;

      try {
         await sendPasswordResetEmail(auth, email);
         toast.success("We've sent you a password reset link. Check your email and follow the instructions to reset your password")
         navigate('/signIn')
      } catch (err) {
         toast.error('Failed to send reset email. Please check the email address and try again.');
      }

   }
   return (
      <div className='flex justify-center items-center min-h-[calc(100vh-391px)]'>
         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
               <img className='w-12 mx-auto' src={logo} alt="Logo" />
               <h2 className='text-xl text-gray-800 text-center mt-2'>Reset Your Password</h2>
               <p className='text-center text-blue-600'>If an account exists with the provided email, a password reset link has been sent. Please check your inbox and follow the instructions to reset your password.</p>
               <form onSubmit={handleReserPass} className="fieldset">
                  <div className='mt-2'>
                     <label className="label mb-1.5 font-medium text-sm  text-gray-800">Email</label>
                     <input required name='email' type="email" className="input w-full rounded-md" placeholder='Enter the email you used to create your account' />
                  </div>
                  <button className="btn btn-neutral mt-4 rounded-md">Send Password Reset Email</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default PassResetPage;