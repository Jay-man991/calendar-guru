
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessagesSquare, 
  Bell, 
  Settings,
  Network
} from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  
  // Update active tab based on location
  useEffect(() => {
    // Extract the base path
    const path = location.pathname.split('/')[1];
    setActiveTab('/' + path);
  }, [location]);

  const navigationItems = [
    {
      path: '/dashboard',
      label: 'Home',
      icon: Calendar
    },
    {
      path: '/sources',
      label: 'Sources',
      icon: MessagesSquare
    },
    {
      path: '/connected-apps',
      label: 'Connect', 
      icon: Network
    },
    {
      path: '/notifications',
      label: 'Alerts',
      icon: Bell
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
      <nav className="flex items-center justify-around">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center py-2 flex-1"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute top-0 h-1 w-1/2 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                  />
                )}
                <div className={cn(
                  "flex flex-col items-center pt-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavigation;
