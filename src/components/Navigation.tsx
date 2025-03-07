
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessagesSquare, 
  Bell, 
  Settings,
  Network,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import Logo from './Logo';

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: Calendar,
  },
  {
    name: 'Sources',
    path: '/sources',
    icon: MessagesSquare,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    name: 'Connected Apps',
    path: '/connected-apps',
    icon: Network, 
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

function Navigation() {
  return (
    <div className="h-full w-56 bg-sidebar border-r border-sidebar-border py-4 hidden md:flex flex-col overflow-hidden">
      <div className="px-5 mb-6">
        <Logo size="md" />
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="px-3 py-2">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </ScrollArea>
      
      <div className="mt-auto px-3 pb-4">
        <Button
          variant="outline"
          className="w-full justify-start text-sidebar-foreground"
          onClick={() => window.open('https://datemate-docs.example.com', '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Documentation
        </Button>
      </div>
    </div>
  );
}

export default Navigation;
