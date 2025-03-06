
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import MessageTester from './MessageTester';
import { EventType } from './EventCard';

interface TesterSectionProps {
  showTester: boolean;
  onEventDetected: (event: EventType) => void;
}

const TesterSection: React.FC<TesterSectionProps> = ({ 
  showTester, 
  onEventDetected 
}) => {
  if (!showTester) return null;
  
  return (
    <>
      <Alert className="mb-6 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
        <InfoIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle>Testing Mode</AlertTitle>
        <AlertDescription>
          This interface allows you to test the event detection capability. Enter messages with dates,
          times, and event information to see how DateMate would process them in a real conversation.
        </AlertDescription>
      </Alert>
      
      <MessageTester onEventDetected={onEventDetected} />
    </>
  );
};

export default TesterSection;
