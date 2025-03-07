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
    confidence: 95
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
    confidence: 90
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
    confidence: 88
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
      event.id === id ? { ...event, status: 'confirmed' } : event
    ));
    toast.success("Event added to calendar!");
  };
  
  const handleRejectEvent = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'rejected' } : event
    ));
    toast.info("Event dismissed");
  };
  
  const handleSaveEvent = (updatedEvent: EventType) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    toast.success("Calendar updated successfully!");
  };

  const handleNewEventDetected = (newEvent: EventType) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const refreshEvents = async () => {
    const currentDate = new Date();
    const randomEvent: EventType = {
      id: uuidv4(),
      title: `New Event ${Math.floor(Math.random() * 100)}`,
      date: new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      time: `${Math.floor(Math.random() * 12 + 9)}:${Math.random() > 0.5 ? '30' : '00'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      location: 'Virtual Meeting',
      description: 'This event was added when you refreshed the events list.',
      source: ['email', 'whatsapp', 'sms'][Math.floor(Math.random() * 3)] as 'email' | 'whatsapp' | 'sms',
      status: 'pending',
      confidence: Math.floor(Math.random() * 20) + 80
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
    refreshEvents
  };
};
