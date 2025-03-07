
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
      <div className="flex justify-between items-center mb-2">
        <div></div>
      </div>
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
