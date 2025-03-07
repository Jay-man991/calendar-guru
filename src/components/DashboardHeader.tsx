
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  showTester: boolean;
  setShowTester: (show: boolean) => void;
  lastSyncText: string;
  onRefresh: () => Promise<boolean>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  showTester, 
  setShowTester,
  lastSyncText,
  onRefresh
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <header className="mb-6 px-2 sm:px-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Review Events</h1>
          <p className="text-gray-600 mt-1">
            Accept or decline detected events
          </p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <div className="flex items-center mr-2">
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-gray-100 rounded-full mr-2"
              disabled={isRefreshing}
            >
              <RefreshCw 
                size={16} 
                className={isRefreshing ? "animate-spin" : ""} 
              />
            </button>
            <span>Last sync:</span>
          </div>
          <span className="font-medium">{lastSyncText}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
