
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EventType } from './EventCard';

interface EventFormProps {
  event: EventType | null;
  open: boolean;
  onClose: () => void;
  onSave: (event: EventType) => void;
}

const EventForm: React.FC<EventFormProps> = ({ 
  event, 
  open, 
  onClose, 
  onSave 
}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState<Date | undefined>(event?.date || new Date());
  const [time, setTime] = useState(event?.time || '');
  const [location, setLocation] = useState(event?.location || '');
  const [description, setDescription] = useState(event?.description || '');
  const [reminder, setReminder] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event || !date) return;
    
    onSave({
      ...event,
      title,
      date,
      time,
      location,
      description,
      status: 'confirmed'
    });
    
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full p-4 h-[100dvh] overflow-y-auto" onEscapeKeyDown={onClose}>
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">
              {event?.status === 'pending' ? 'Confirm Event' : 'Edit Event'}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SheetDescription>
            Make changes to the event before adding it to your calendar.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="animate-in-left animation-delay-75"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal animate-in-left animation-delay-100 w-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative animate-in-left animation-delay-125">
                <Input 
                  id="time" 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="pl-10"
                />
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="animate-in-left animation-delay-150"
              placeholder="Enter location (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20 animate-in-left animation-delay-175"
              placeholder="Add details (optional)"
            />
          </div>
          
          <div className="flex items-center justify-between pt-2 animate-in-up animation-delay-200">
            <div className="space-y-0.5">
              <Label htmlFor="reminder">Set reminder</Label>
              <p className="text-sm text-muted-foreground">
                Notify me before the event
              </p>
            </div>
            <Switch 
              id="reminder" 
              checked={reminder} 
              onCheckedChange={setReminder}
            />
          </div>
        
          <SheetFooter className="pt-4 animate-in-up animation-delay-300 flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Add to Calendar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EventForm;
