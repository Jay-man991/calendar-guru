
import React from 'react';
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  showTester: boolean;
  setShowTester: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  showTester, 
  setShowTester 
}) => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
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
