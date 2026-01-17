import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 transition-all duration-300 flex flex-col h-auto max-w-full">
        <div className="flex-1 flex flex-col h-full">
          <main className="flex-1 flex flex-col h-full justify-between  w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
