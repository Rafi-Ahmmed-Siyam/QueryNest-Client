/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",  
      "./public/index.html"
   ],
   theme: {
      extend: {
         colors: {
            primaryCol: '#3B82F6',      
            secondaryCol: '#E0F2FE',      
            backgroundCol: '#FAFAFA',     
            textBaseCol: '#1F2937',       
            accentCol: '#0EA5E9',         
         },
      },
   },
}