
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { parseMessage, createEventFromDetection } from '../utils/messageParser';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Scan } from 'lucide-react';
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
      onEventDetected(newEvent);
      toast.success("Event detected!", {
        description: `Confidence: ${detection.confidence}%`,
      });
      setMessage(''); // Clear the message area after successful detection
    } else {
      toast.info("No event detected", {
        description: "Try including more specific details like dates, times, and purpose.",
      });
    }
  };

  return (
    <div className="bg-background border rounded-lg p-5 mb-6">
      <h2 className="text-lg font-medium mb-4">Scan Message for Events</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Source:</span>
          <Select 
            value={source} 
            onValueChange={(value) => setSource(value as any)}
          >
            <SelectTrigger className="w-40">
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
          placeholder="Paste your message here to scan for event details..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32"
        />
        
        <Button 
          onClick={handleScan}
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <Scan className="h-5 w-5" />
          Scan for Events
        </Button>
      </div>
    </div>
  );
};

export default ManualEventDetection;
