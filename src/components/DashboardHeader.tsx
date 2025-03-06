
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

interface DashboardHeaderProps {
  showTester: boolean;
  setShowTester: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  showTester, 
  setShowTester 
}) => {
  const { logout } = useAuth();
  
  return (
    <header className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
      <p className="text-muted-foreground">
        We've detected some new events from your messages. Review and add them to your calendar.
      </p>
      <div className="flex gap-2 mt-4">
        <Button 
          variant={showTester ? "default" : "outline"} 
          onClick={() => setShowTester(!showTester)}
        >
          {showTester ? "Hide Test Interface" : "Show Test Interface"}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
