
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';
import { RefreshCw, Clock } from 'lucide-react';

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
            <div className="flex items-center text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full shadow-sm transition-all">
              <button 
                onClick={handleRefresh}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full mr-2 transition-colors group"
                disabled={isRefreshing}
                aria-label="Refresh events"
              >
                <RefreshCw 
                  size={16} 
                  className={`text-white group-hover:text-white ${isRefreshing ? "animate-spin" : ""}`} 
                />
              </button>
              <div className="flex items-center">
                <Clock size={14} className="text-white/80 mr-1.5" />
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
