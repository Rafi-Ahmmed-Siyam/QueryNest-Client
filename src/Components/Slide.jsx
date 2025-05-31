import React from 'react';
import { Link } from 'react-router-dom';

const Slide = ({ img, hedding, subtext,btnContent,link }) => {
   return (
      <div
         className='w-full bg-center bg-cover h-[20rem] md:h-[32rem] lg:h-[38rem] bg-black'
         style={{
            backgroundImage: `url(${img})`
         }}
      >
         <div className='flex justify-center items-center w-full h-full bg-gray-900/70'>
            <div className='text-center'>
               <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>{hedding}</h2>
               <p className='text-gray-300 mt-2 text-sm lg:text-base'>{subtext}</p>
               <Link className='mt-5 btn bg-[#0EA5E9] border-none text-white text-sm lg:text-base lg:px-7  lg:py-6' to={`${link}`}>{btnContent}</Link>
            </div>
         </div>
      </div>
   );
};

export default Slide;