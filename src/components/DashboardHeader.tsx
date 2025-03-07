
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import Logo from './Logo';

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
          <p className="text-gray-600 mt-1">
            Accept or decline detected events
          </p>
        </div>
        
        <div className="flex items-center text-sm bg-green-100 px-3 py-1 rounded-full shadow-sm">
          <div className="flex items-center mr-2">
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-green-200 rounded-full mr-2 transition-colors"
              disabled={isRefreshing}
              aria-label="Refresh events"
            >
              <RefreshCw 
                size={16} 
                className={`text-green-600 ${isRefreshing ? "animate-spin" : ""}`} 
              />
            </button>
            <span className="text-green-700">Last sync:</span>
          </div>
          <span className="font-medium text-green-800">{lastSyncText}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
