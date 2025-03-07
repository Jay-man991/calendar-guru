
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Bell, MessageSquare, Home, Calendar, HelpCircle, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from './Logo';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const mainNavItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Sources', path: '/sources' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];
  
  const secondaryNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];
  
  return (
    <aside className="w-64 bg-white border-r h-full hidden md:flex flex-col">
      <div className="p-4 border-b">
        <Logo size="md" />
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="flex flex-col gap-1 mb-8">
          <div className="px-3 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Main</p>
          </div>
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                location.pathname === item.path ? "text-blue-500" : "text-gray-500"
              )} />
              <span>{item.label}</span>
              
              {item.label === 'Notifications' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white ml-auto">
                  3
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <nav className="flex flex-col gap-1">
          <div className="px-3 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Misc</p>
          </div>
          {secondaryNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                location.pathname === item.path ? "text-blue-500" : "text-gray-500"
              )} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
