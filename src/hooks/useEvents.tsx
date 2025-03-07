
import { useState } from 'react';
import { EventType } from '../components/EventCard';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration
const initialEvents: EventType[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2024, 2, 20),
    time: '10:00 AM',
    location: 'Conference Room A',
    description: 'Hey team, let\'s have a meeting on March 20th at 10 AM in Conference Room A',
    source: 'email',
    status: 'pending',
    confidence: 95,
    isReminder: true,
    reminderTime: '30min',
    sourceDetails: {
      platform: 'Google Gmail',
      sender: 'manager@company.com'
    }
  },
  {
    id: '2',
    title: 'Coffee with Sarah',
    date: new Date(2024, 2, 20),
    time: '2:30 PM',
    location: 'Starbucks',
    description: 'Want to grab coffee at Starbucks on March 20th at 2:30?',
    source: 'whatsapp',
    status: 'pending',
    confidence: 90,
    isReminder: true,
    reminderTime: '1hour',
    sourceDetails: {
      platform: 'WhatsApp',
      sender: 'Sarah Johnson'
    }
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    date: new Date(2024, 2, 21),
    time: '9:15 AM',
    location: 'Dr. Smith Clinic',
    description: 'Your appointment with Dr. Smith is confirmed for March 21st at 9:15 AM.',
    source: 'sms',
    status: 'pending',
    confidence: 88,
    isReminder: true,
    reminderTime: '1day',
    sourceDetails: {
      platform: 'SMS',
      sender: '+1234567890'
    }
  }
];

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  const pendingEvents = events.filter(event => event.status === 'pending');
  const confirmedEvents = events.filter(event => event.status === 'confirmed');
  
  const getLastSyncText = () => {
    return formatDistanceToNow(lastRefreshed, { addSuffix: true });
  };
  
  const handleConfirmEvent = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'confirmed', isReminder: true } : event
    ));
    toast.success("Reminder set successfully!");
  };
  
  const handleRejectEvent = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'rejected' } : event
    ));
    toast.info("Reminder dismissed");
  };
  
  const handleSaveEvent = (updatedEvent: EventType) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    
    if (updatedEvent.status === 'pending') {
      toast.success("Reminder set successfully!");
    } else {
      toast.success("Reminder updated successfully!");
    }
  };

  const handleNewEventDetected = (newEvent: EventType) => {
    const eventWithReminder = {
      ...newEvent,
      isReminder: true,
      reminderTime: '30min'
    };
    setEvents(prevEvents => [eventWithReminder, ...prevEvents]);
  };

  // Simulate API calls to various services
  const connectToAPI = async (service: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        toast.success(`Connected to ${service} successfully!`);
        resolve(true);
      }, 1500);
    });
  };

  const refreshEvents = async () => {
    const currentDate = new Date();
    const sources = ['email', 'whatsapp', 'messenger', 'sms'];
    const randomSource = sources[Math.floor(Math.random() * sources.length)] as 'email' | 'whatsapp' | 'messenger' | 'sms';
    
    const randomEvent: EventType = {
      id: uuidv4(),
      title: `New Reminder ${Math.floor(Math.random() * 100)}`,
      date: new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      time: `${Math.floor(Math.random() * 12 + 9)}:${Math.random() > 0.5 ? '30' : '00'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      location: 'Virtual Meeting',
      description: 'This reminder was added when you refreshed.',
      source: randomSource,
      status: 'pending',
      confidence: Math.floor(Math.random() * 20) + 80,
      isReminder: true,
      reminderTime: '30min',
      sourceDetails: {
        platform: randomSource === 'email' ? 'Gmail' : 
                 randomSource === 'whatsapp' ? 'WhatsApp' : 
                 randomSource === 'messenger' ? 'Messenger' : 'SMS',
        sender: randomSource === 'email' ? 'example@mail.com' : 
               randomSource === 'whatsapp' ? 'John Doe' : 
               randomSource === 'messenger' ? 'Jane Smith' : '+1234567890'
      }
    };
    
    setEvents(prevEvents => [randomEvent, ...prevEvents]);
    setLastRefreshed(new Date());
    return true;
  };

  return {
    events,
    pendingEvents,
    confirmedEvents,
    lastRefreshed,
    getLastSyncText,
    handleConfirmEvent,
    handleRejectEvent,
    handleSaveEvent,
    handleNewEventDetected,
    refreshEvents,
    connectToAPI
  };
};
