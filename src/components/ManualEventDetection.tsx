
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { parseMessage, createEventFromDetection } from '../utils/messageParser';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bell, MessageCircle, Mail, Smartphone, MessageSquare } from 'lucide-react';
import { EventType } from './EventCard';

interface ManualEventDetectionProps {
  onEventDetected: (event: EventType) => void;
}

const ManualEventDetection: React.FC<ManualEventDetectionProps> = ({ onEventDetected }) => {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState<'email' | 'whatsapp' | 'messenger' | 'sms'>('whatsapp');

  const handleScan = () => {
    if (!message.trim()) {
      toast.error("Please enter a message to scan");
      return;
    }

    const detection = parseMessage(message, source);
    
    if (detection) {
      const newEvent = createEventFromDetection(detection, source);
      // Add reminder specific fields with the correct type
      const reminderEvent = {
        ...newEvent,
        isReminder: true,
        reminderTime: '30min' as '10min' | '30min' | '1hour' | '1day'
      };
      onEventDetected(reminderEvent);
      toast.success("Reminder detected!", {
        description: `Confidence: ${detection.confidence}%`,
      });
      setMessage(''); // Clear the message area after successful detection
    } else {
      toast.info("No reminder detected", {
        description: "Try including more specific details like dates, times, and purpose.",
      });
    }
  };

  const getSourceIcon = () => {
    switch (source) {
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
    <div className="bg-background border rounded-lg p-5 mb-6">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Bell className="h-5 w-5 text-blue-500" />
        Scan Message for Reminders
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Source:</span>
          <Select 
            value={source} 
            onValueChange={(value) => setSource(value as any)}
          >
            <SelectTrigger className="w-40 flex items-center gap-2">
              {getSourceIcon()}
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="messenger">Messenger</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          placeholder="Paste your message here to scan for reminders and event details..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32"
        />
        
        <Button 
          onClick={handleScan}
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <Bell className="h-5 w-5" />
          Scan for Reminders
        </Button>
      </div>
    </div>
  );
};

export default ManualEventDetection;
