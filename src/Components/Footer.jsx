import React from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import mainLogo from '../assets/MainIcon.png'
import { Link } from 'react-router-dom';


const Footer = () => {
   return (
      <footer className="bg-[#E0F2FE] py-8">

         <aside className='flex justify-center'>
            <div>
               <img className='w-14 mx-auto' src={mainLogo} alt="" />
               <h2 className='font-bold text-lg lg:text-xl mt-1 text-center text-[#1F2937]'>QueryNest</h2>
            </div>

         </aside>
         <div className='flex justify-center items-center gap-5 mt-3'>
            <p className='text-[#1F2937] text-sm hover:text-blue-700'><a href="#">Home</a></p>
            <p className='text-[#1F2937] text-sm hover:text-blue-700'><a href="#">About</a></p>
            <p className='text-[#1F2937] text-sm hover:text-blue-700'><a href="#">Terms</a></p>
            <p className='text-[#1F2937] text-sm hover:text-blue-700'><a href="#">Privacy</a></p>
            <p className='text-[#1F2937] text-sm hover:text-blue-700'><a href="#">Cookies</a></p>
         </div>
         <div className='flex justify-center items-center gap-5 mt-5'>
            <div><a href=""><FaLinkedinIn className='text-xl md:text-2xl lg:text-2xl' /></a></div>
            <div><a href=""><FaGithub className='text-xl md:text-2xl lg:text-2xl' /></a></div>
            <div><a href=""><FaFacebookF className='text-xl md:text-2xl lg:text-2xl' /></a></div>
         </div>
         <hr className='my-7 max-w-7xl mx-auto' />

         <p className='text-center text-[#1F2937] text-sm'>Copyright © {new Date().getFullYear()} - All right reserved by QueryNest Industries Ltd</p>


      </footer>
   );
};

export default Footer;