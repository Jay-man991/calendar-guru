
import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import Logo from './Logo';
import { CheckCheck, Clock, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  lastSyncText?: string;
  onRefresh?: () => Promise<boolean>;
}

const Layout: React.FC<LayoutProps> = ({ children, lastSyncText, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { user } = useAuth();
  
  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return 'U';
    
    if (user.name) {
      return user.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user.email.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="py-3 px-4 bg-white border-b shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="md" className="text-blue-500 mr-4" />
            {user && (
              <span className="hidden sm:inline text-sm text-gray-500">
                Welcome, <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {lastSyncText && onRefresh && (
              <div className="flex items-center text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full shadow-sm transition-all">
                <Button 
                  onClick={handleRefresh}
                  className="p-0.5 h-5 w-5 bg-green-500 hover:bg-green-600 rounded-full mr-1 transition-colors flex items-center justify-center"
                  disabled={isRefreshing}
                  aria-label="Refresh events"
                  size="icon"
                  variant="default"
                >
                  <CheckCheck 
                    size={10} 
                    className={`text-white ${isRefreshing ? "animate-spin" : ""}`} 
                  />
                </Button>
                <div className="flex items-center">
                  <Clock size={8} className="text-gray-500 mr-0.5" />
                  <span className="text-gray-600 font-medium">
                    {lastSyncText.includes('minutes') || lastSyncText.includes('hours') || lastSyncText.includes('days') ? 
                      `Last synced ${lastSyncText}` : 
                      lastSyncText
                    }
                  </span>
                </div>
              </div>
            )}
            
            <Link to="/notifications" className="relative md:hidden">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                3
              </span>
            </Link>
            
            <div className="ml-2 md:hidden">
              <Avatar className="w-8 h-8 bg-blue-100 text-blue-600">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 sm:px-6 md:px-8 pt-4"
        >
          {children}
        </motion.div>
        
        <MobileNavigation />
      </main>
    </div>
  );
};

export default Layout;
