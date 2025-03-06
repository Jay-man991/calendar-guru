
import React, { useState } from 'react';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import { EventType } from '../components/EventCard';
import { toast } from "sonner";

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
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Dinner with Sarah',
    date: new Date(2023, 6, 18),
    time: '19:30',
    location: 'Bella Italia Restaurant',
    description: 'Catch-up dinner with Sarah. She mentioned wanting to try the new pasta dish.',
    source: 'whatsapp',
    status: 'confirmed'
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

const Calendar = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowForm(true);
  };
  
  const handleSaveEvent = (updatedEvent: EventType) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    toast.success("Event updated successfully!");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming events
          </p>
        </header>
        
        <CalendarView
          events={events}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onEventClick={handleEventClick}
        />
        
        <EventForm
          event={selectedEvent}
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setSelectedEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      </div>
    </Layout>
  );
};

export default Calendar;
