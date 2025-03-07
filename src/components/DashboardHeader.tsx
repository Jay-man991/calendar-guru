
import React from 'react';

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
    </header>
  );
};

export default DashboardHeader;
