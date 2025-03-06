
import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { EventType } from './EventCard';

interface NotificationBubbleProps {
  event: EventType;
  onOpen: () => void;
  onDismiss: () => void;
}

const NotificationBubble: React.FC<NotificationBubbleProps> = ({ 
  event, 
  onOpen, 
  onDismiss 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-20 md:bottom-6 right-6 max-w-xs w-full bg-background border rounded-xl shadow-lg z-20 overflow-hidden"
    >
      <div className="bg-primary px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span className="font-medium text-sm">New Event Detected</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-primary-foreground hover:bg-primary/20"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <h4 className="font-medium mb-1">{event.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">
          We detected this event from your recent {event.source} messages.
        </p>
        
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
          <Button
            size="sm"
            className="btn-animation"
            onClick={onOpen}
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationBubble;
