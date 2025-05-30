import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='font-roboto'>
      <header className='container mx-auto sticky top-0 z-50'>
        <Navbar />
      </header>
      <main className='container mx-auto min-h-[calc(100vh-391px)] bg-[#FAFAFA]'>
        <Outlet/>
      </main>
      <footer className='container mx-auto'>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

// min-h-[calc(100vh-306px)]