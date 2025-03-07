
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="py-3 px-4 border-b flex items-center justify-between md:hidden backdrop-blur-sm bg-background/80">
          <Logo size="sm" />
        </header>
        
        <div className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 sm:px-6 md:px-8">
          {children}
        </div>
        
        <MobileNavigation />
      </main>
    </div>
  );
};

export default Layout;
