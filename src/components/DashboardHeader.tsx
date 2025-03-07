
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface DashboardHeaderProps {
  showTester: boolean;
  setShowTester: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  showTester, 
  setShowTester
}) => {
  const { user } = useAuth();
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  // Determine greeting based on time of day
  const getGreeting = () => {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // Get day of week
  const getDayOfWeek = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[currentTime.getDay()];
  };
  
  // Format date as "Month Day, Year"
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };
  
  return (
    <header className="mb-6 px-2 sm:px-0">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'}!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Today is {getDayOfWeek()}, {getFormattedDate()}
          </p>
        </div>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-blue-700">Your Day</h3>
                <p className="text-sm text-gray-600 mt-1">
                  You have {Math.floor(Math.random() * 3) + 1} events today
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                <span>Updated just now</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
};

export default DashboardHeader;
