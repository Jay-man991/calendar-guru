
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';
import { CheckCheck, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
  lastSyncText?: string;
  onRefresh?: () => Promise<boolean>;
}

const Layout: React.FC<LayoutProps> = ({ children, lastSyncText, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-white">
      <Navigation />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="py-4 px-4 bg-blue-500 text-white shadow-md flex items-center justify-between">
          <Logo size="md" className="text-white" />
          
          {lastSyncText && onRefresh && (
            <div className="flex items-center text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full shadow-sm transition-all">
              <Button 
                onClick={handleRefresh}
                className="p-1 h-6 w-6 bg-green-500 hover:bg-green-600 rounded-full mr-1.5 transition-colors flex items-center justify-center"
                disabled={isRefreshing}
                aria-label="Refresh events"
                size="icon"
                variant="default"
              >
                <CheckCheck 
                  size={12} 
                  className={`text-white ${isRefreshing ? "animate-spin" : ""}`} 
                />
              </Button>
              <div className="flex items-center">
                <Clock size={10} className="text-white/80 mr-1" />
                <span className="text-white font-medium">{lastSyncText}</span>
              </div>
            </div>
          )}
        </header>
        
        <div className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 sm:px-6 md:px-8 bg-gray-50">
          {children}
        </div>
        
        <MobileNavigation />
      </main>
    </div>
  );
};

export default Layout;
