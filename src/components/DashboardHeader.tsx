
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
    <header className="mb-6 px-2 sm:px-0">
      <h1 className="text-2xl font-bold text-gray-800">Review Events</h1>
      <p className="text-gray-600 mt-1">
        Accept or decline detected events
      </p>
    </header>
  );
};

export default DashboardHeader;
