
import React, { useState } from 'react';
import { parseMessage, createEventFromDetection } from '../utils/messageParser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Scan } from 'lucide-react';

interface MessageTesterProps {
  onEventDetected: (event: any) => void;
}

const MessageTester: React.FC<MessageTesterProps> = ({ onEventDetected }) => {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState<'email' | 'whatsapp' | 'messenger' | 'sms'>('whatsapp');

  const handleTest = () => {
    if (!message.trim()) {
      toast.error("Please enter a message to test");
      return;
    }

    const detection = parseMessage(message, source);
    
    if (detection) {
      const newEvent = createEventFromDetection(detection, source);
      onEventDetected(newEvent);
      toast.success("Event detected!", {
        description: `Confidence: ${detection.confidence}%`,
      });
    } else {
      toast.info("No event detected", {
        description: "Try including more specific details like dates, times, and purpose.",
      });
    }
  };

  // Example templates to help users test the system
  const examples = [
    "Let's meet for coffee tomorrow at 3pm at Starbucks downtown",
    "The team meeting is scheduled for next Monday at 10am in Conference Room B",
    "Don't forget about your dentist appointment on June 15th at 2:30pm",
    "I booked us dinner reservations for Friday at 7:30pm at Luigi's Italian Restaurant"
  ];

  const useExample = (example: string) => {
    setMessage(example);
  };

  return (
    <div className="bg-background border rounded-lg p-5 mb-6">
      <h2 className="text-lg font-medium mb-4">Test Event Detection</h2>
      
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
          placeholder="Enter a message containing event details..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32"
        />
        
        <div className="flex flex-col items-center gap-4">
          <Button 
            onClick={handleTest} 
            className="w-full h-14 text-lg flex justify-center items-center gap-2"
            size="lg"
          >
            <Scan className="h-5 w-5" />
            Scan for Events
          </Button>
          
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setMessage('')}>
              Clear
            </Button>
            
            <Button variant="secondary" onClick={handleTest} className="btn-animation">
              Test Detection
            </Button>
          </div>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                onClick={() => useExample(example)}
                className="text-xs"
              >
                Example {idx + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTester;
