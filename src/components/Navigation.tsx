
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Bell, MessageSquare, Home, Calendar, HelpCircle, User, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
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
    <aside className="w-64 bg-white border-r h-full hidden md:flex flex-col">
      <div className="p-4 border-b">
        <Logo size="md" />
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        {user && (
          <div className="mb-6 px-3">
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-gray-900"
            >
              Welcome, {user.name || user.email.split('@')[0]}
            </motion.p>
          </div>
        )}
        
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
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center w-full outline-none">
            <div className="flex items-center">
              <Avatar className="w-9 h-9 bg-blue-100 text-blue-600 mr-3">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.email.split('@')[0]}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Navigation;
