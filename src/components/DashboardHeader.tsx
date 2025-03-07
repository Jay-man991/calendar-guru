import React from 'react';
import Logo from './Logo';

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
      <div className="flex justify-between items-center">
        <div>
          {/* The "Accept or decline detected events" paragraph has been removed */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
