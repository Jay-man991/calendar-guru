
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, ArrowRight, Check, X, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EventType {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  description?: string;
  source: 'email' | 'whatsapp' | 'messenger' | 'sms';
  status: 'pending' | 'confirmed' | 'rejected';
}

interface EventCardProps {
  event: EventType;
  onConfirm: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  className?: string;
}

const sourceIcons = {
  email: '✉️',
  whatsapp: '💬',
  messenger: '💌',
  sms: '📱',
};

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onConfirm, 
  onEdit, 
  onReject,
  className 
}) => {
  return (
    <div 
      className={cn(
        "datemate-card animate-in-up transition-all", 
        event.status === 'pending' ? 'pending-event' : 'confirmed-event',
        className
      )}
    >
      <div className="absolute top-3 right-3 text-sm font-medium text-muted-foreground">
        {sourceIcons[event.source]}
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
      
      <div className="flex flex-col gap-2 mb-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>{event.time}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
      
      {event.description && (
        <div className="message-bubble relative pl-3 pr-4 py-2 mb-4 bg-muted/70 rounded-lg rounded-tl-none border-l-2 border-primary/50 text-sm text-muted-foreground">
          <div className="absolute -left-2 top-0 w-3 h-3 bg-muted/70 transform rotate-45"></div>
          {event.description}
        </div>
      )}
      
      {event.status === 'pending' && (
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <Button 
              size="icon" 
              className="event-action-btn bg-green-100 hover:bg-green-200 text-green-700"
              onClick={() => onConfirm(event.id)}
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="event-action-btn bg-blue-100 hover:bg-blue-200 text-blue-700"
              onClick={() => onEdit(event.id)}
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="event-action-btn bg-red-100 hover:bg-red-200 text-red-700"
              onClick={() => onReject(event.id)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-sm btn-animation"
            onClick={() => onEdit(event.id)}
          >
            <span>Details</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
      
      {event.status === 'confirmed' && (
        <div className="flex items-center justify-end mt-3">
          <div className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Added to Calendar
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
