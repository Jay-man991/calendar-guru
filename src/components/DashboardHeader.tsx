
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BarChart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  showTester: boolean;
  setShowTester: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  showTester, 
  setShowTester 
}) => {
  const stats = [
    { 
      id: 'events', 
      label: 'Upcoming Events', 
      value: '3', 
      icon: <Calendar className="h-5 w-5 text-primary" />,
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30'
    },
    { 
      id: 'pending', 
      label: 'Pending Events', 
      value: '2', 
      icon: <BarChart className="h-5 w-5 text-accent" />,
      color: 'bg-gradient-to-br from-accent-50 to-purple-50 dark:from-accent-900/30 dark:to-purple-900/30'
    },
    { 
      id: 'friends', 
      label: 'Connected Platforms', 
      value: '4', 
      icon: <Users className="h-5 w-5 text-green-500" />,
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30'
    }
  ];

  return (
    <header className="mb-6 px-2 sm:px-0">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your calendar
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`shadow-sm hover:shadow-md transition-all ${stat.color} border-t-4 border-t-primary`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </header>
  );
};

export default DashboardHeader;
