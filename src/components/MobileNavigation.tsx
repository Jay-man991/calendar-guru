
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Bell, MessageSquare, Home, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Sources', path: '/sources' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-10">
      <nav className="flex justify-between px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-3 text-xs",
              location.pathname === item.path 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavigation;
