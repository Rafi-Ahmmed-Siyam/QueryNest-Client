import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Spinner = () => {
   return (
      <div className='flex justify-center items-center min-h-[calc(100vh-391px)]'>
         <ScaleLoader
            color='#0EA5E9'
         />
      </div>
   );
};

export default Spinner;