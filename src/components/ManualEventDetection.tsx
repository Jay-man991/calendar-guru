
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { parseMessage, createEventFromDetection } from '../utils/messageParser';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bell, MessageCircle, Mail, Smartphone, MessageSquare, Sparkles } from 'lucide-react';
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

  const getSourceColor = () => {
    switch (source) {
      case 'whatsapp':
        return 'from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-200';
      case 'email':
        return 'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200';
      case 'messenger':
        return 'from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 border-purple-200';
      case 'sms':
        return 'from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 border-orange-200';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getSourceColor()} border rounded-lg p-5 mb-6 shadow-sm transition-all duration-300`}>
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-purple-500" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Scan Message for Reminders
        </span>
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Source:</span>
          <Select 
            value={source} 
            onValueChange={(value) => setSource(value as any)}
          >
            <SelectTrigger className="w-40 flex items-center gap-2 border-none bg-white/70 backdrop-blur-sm shadow-sm">
              {getSourceIcon()}
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-500" />
                <span>WhatsApp</span>
              </SelectItem>
              <SelectItem value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>Email</span>
              </SelectItem>
              <SelectItem value="messenger" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                <span>Messenger</span>
              </SelectItem>
              <SelectItem value="sms" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-orange-500" />
                <span>SMS</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          placeholder="Paste your message here to scan for reminders and event details..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32 bg-white/70 backdrop-blur-sm border-none shadow-sm focus-visible:ring-offset-1"
        />
        
        <Button 
          onClick={handleScan}
          size="lg"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Bell className="h-5 w-5" />
          Scan for Reminders
        </Button>
      </div>
    </div>
  );
};

export default ManualEventDetection;
