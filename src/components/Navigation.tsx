
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Settings, Bell, MessageSquare, Clock, Home } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from './Logo';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Sources', path: '/sources' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <aside className="w-64 p-4 border-r h-full hidden md:block">
      <div className="flex flex-col h-full">
        <div className="py-4">
          <Logo size="md" />
        </div>
        
        <nav className="flex flex-col gap-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link",
                location.pathname === item.path && "active"
              )}
            >
              <span className="nav-indicator" />
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto pb-6">
          <div className="datemate-card bg-accent/50 flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent">
              <Clock className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Pro Tip</h4>
              <p className="text-xs text-muted-foreground">
                Set reminders for better time management
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
