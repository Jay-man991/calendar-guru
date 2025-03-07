
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Navigation />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="py-4 px-4 bg-blue-500 text-white text-center shadow-md flex items-center justify-center md:hidden">
          <h1 className="text-xl font-semibold">Review Events</h1>
        </header>
        
        <div className="hidden md:flex py-4 px-4 bg-blue-500 text-white text-center shadow-md items-center justify-center">
          <h1 className="text-xl font-semibold">Review Events</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 sm:px-6 md:px-8 bg-gray-50">
          {children}
        </div>
        
        <MobileNavigation />
      </main>
    </div>
  );
};

export default Layout;
