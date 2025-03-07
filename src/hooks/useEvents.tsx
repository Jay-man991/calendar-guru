
import { useState } from 'react';
import { EventType } from '../components/EventCard';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Mock data for demonstration
const initialEvents: EventType[] = [
  {
    id: '1',
    title: 'Team Meeting with Marketing',
    date: new Date(2023, 6, 15),
    time: '14:00',
    location: 'Conference Room 3',
    description: 'Quarterly review of marketing campaigns and strategy planning session.',
    source: 'email',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Dinner with Sarah',
    date: new Date(2023, 6, 18),
    time: '19:30',
    location: 'Bella Italia Restaurant',
    description: 'Catch-up dinner with Sarah. She mentioned wanting to try the new pasta dish.',
    source: 'whatsapp',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Dentist Appointment',
    date: new Date(2023, 6, 20),
    time: '10:15',
    location: 'Dr. Smith Dental Clinic',
    description: 'Regular check-up and cleaning.',
    source: 'sms',
    status: 'confirmed'
  }
];

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  const pendingEvents = events.filter(event => event.status === 'pending');
  const confirmedEvents = events.filter(event => event.status === 'confirmed');
  
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
    // Add the new event to the list
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const refreshEvents = async () => {
    // In a real app, this would call an API
    // For demo purposes, we'll add a random new event
    const currentDate = new Date();
    const randomEvent: EventType = {
      id: uuidv4(),
      title: `New Event ${Math.floor(Math.random() * 100)}`,
      date: new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within the next week
      time: `${Math.floor(Math.random() * 12 + 9)}:${Math.random() > 0.5 ? '30' : '00'}`,
      location: 'Virtual Meeting',
      description: 'This event was added when you refreshed the events list.',
      source: ['email', 'whatsapp', 'sms'][Math.floor(Math.random() * 3)] as 'email' | 'whatsapp' | 'sms',
      status: 'pending'
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
    handleConfirmEvent,
    handleRejectEvent,
    handleSaveEvent,
    handleNewEventDetected,
    refreshEvents
  };
};
