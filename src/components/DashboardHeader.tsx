
import React, { useState } from 'react';
import { RefreshCw, Clock } from 'lucide-react';
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
          {/* The "Accept or decline detected events" paragraph has been removed */}
        </div>
        
        <div className="flex items-center text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full shadow-sm transition-all">
          <button 
            onClick={handleRefresh}
            className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-full mr-2 transition-colors group"
            disabled={isRefreshing}
            aria-label="Refresh events"
          >
            <RefreshCw 
              size={16} 
              className={`text-blue-600 group-hover:text-blue-700 ${isRefreshing ? "animate-spin" : ""}`} 
            />
          </button>
          <div className="flex items-center">
            <Clock size={14} className="text-blue-500 mr-1.5" />
            <span className="text-blue-700 font-medium">{lastSyncText}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
