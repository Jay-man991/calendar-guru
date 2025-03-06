
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Navigation />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="py-4 px-6 border-b flex items-center justify-between md:hidden">
          <Logo size="sm" />
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          {children}
        </div>
        
        <MobileNavigation />
      </main>
    </div>
  );
};

export default Layout;
