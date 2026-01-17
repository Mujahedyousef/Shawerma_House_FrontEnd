import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
