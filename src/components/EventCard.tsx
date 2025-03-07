
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, UserCheck, Briefcase, Activity, Bell, Edit2, MessageCircle, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

export interface EventType {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  description?: string;
  source: 'email' | 'whatsapp' | 'messenger' | 'sms';
  status: 'pending' | 'confirmed' | 'rejected';
  confidence?: number;
  reminderTime?: '10min' | '30min' | '1hour' | '1day';
  isReminder?: boolean;
  sourceDetails?: {
    platform: string;
    sender?: string;
  };
}

interface EventCardProps {
  event: EventType;
  onConfirm: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onConfirm, 
  onEdit, 
  onReject,
  className 
}) => {
  // Get icon based on event title
  const getEventIcon = () => {
    if (event.title.toLowerCase().includes('meeting')) {
      return (
        <div className="bg-blue-100 p-4 rounded-full">
          <Briefcase className="h-6 w-6 text-blue-500" />
        </div>
      );
    } else if (event.title.toLowerCase().includes('coffee') || event.title.toLowerCase().includes('dinner')) {
      return (
        <div className="bg-green-100 p-4 rounded-full">
          <UserCheck className="h-6 w-6 text-green-500" />
        </div>
      );
    } else if (event.title.toLowerCase().includes('doctor') || event.title.toLowerCase().includes('dentist')) {
      return (
        <div className="bg-red-100 p-4 rounded-full">
          <Activity className="h-6 w-6 text-red-500" />
        </div>
      );
    } else {
      return (
        <div className="bg-purple-100 p-4 rounded-full">
          <Calendar className="h-6 w-6 text-purple-500" />
        </div>
      );
    }
  };

  // Get source icon
  const getSourceIcon = () => {
    switch (event.source) {
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'messenger':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'sms':
        return <Smartphone className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          {getEventIcon()}
          <h3 className="text-lg font-semibold ml-3">{event.title}</h3>
        </div>
        {event.status === 'confirmed' && (
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0" 
            onClick={() => onEdit(event.id)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="ml-1 space-y-2 mb-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span>{format(event.date, 'EEE, MMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span>{event.time}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{event.location}</span>
          </div>
        )}
        
        {event.reminderTime && (
          <div className="flex items-center text-gray-600">
            <Bell className="h-4 w-4 mr-2 text-gray-400" />
            <span>Reminder: {event.reminderTime} before</span>
          </div>
        )}
      </div>
      
      {event.status === 'pending' && event.description && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4 text-gray-600">
          <div className="flex items-center gap-1.5 mb-2">
            {getSourceIcon()}
            <span className="text-sm capitalize font-medium">{event.source}</span>
            <span className="text-xs text-muted-foreground">detected this reminder</span>
          </div>
          <p className="text-gray-700 italic text-sm">{event.description}</p>
          
          {event.confidence && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Confidence:</span>
                <span className="text-blue-500 font-semibold">{event.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${event.confidence}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {event.status === 'pending' && (
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="rounded-full bg-red-100 hover:bg-red-200 border-none text-red-500 w-10 h-10 p-0"
            onClick={() => onReject(event.id)}
          >
            <span className="text-xl">✕</span>
          </Button>
          
          <Button 
            size="sm"
            className="rounded-full bg-green-100 hover:bg-green-200 border-none text-green-500 w-10 h-10 p-0"
            onClick={() => onConfirm(event.id)}
          >
            <span className="text-xl">✓</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
