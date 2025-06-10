import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
         <div
            className="
          bg-white p-8 rounded-lg shadow-xl text-center
          max-w-md w-full mx-auto
          flex flex-col items-center gap-6
        "
         >
            {/* Error code display, using a bold, large font and a blue color */}
            <h1 className="text-8xl font-extrabold text-blue-600">
               404
            </h1>

            {/* Error message */}
            <h2 className="text-3xl font-semibold text-gray-800">
               Page Not Found
            </h2>

            {/* Descriptive text for the error */}
            <p className="text-gray-600 text-lg">
               Oops! The page you're looking for doesn't exist or an error occurred.
               Please check the URL or return to the homepage.
            </p>

            {/* Button to navigate to the homepage */}
            {/* Styled with Daisy UI's 'btn-primary' for a prominent blue button,
            and Tailwind classes for padding and rounding. */}
            <Link 
            to={'/'}
            className="
            btn btn-primary bg-blue-600 hover:bg-blue-700
            text-white font-bold py-3 px-6 rounded-lg transition-all duration-300
            transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
          "
            >
               Go to Homepage
            </Link>
         </div>
      </div>
   );
};

export default ErrorPage;