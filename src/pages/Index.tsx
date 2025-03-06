
import React, { useState } from 'react';
import Layout from '../components/Layout';
import EventCard, { EventType } from '../components/EventCard';
import EventForm from '../components/EventForm';
import NotificationBubble from '../components/NotificationBubble';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from 'framer-motion';
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

const Index = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  
  const pendingEvents = events.filter(event => event.status === 'pending');
  const confirmedEvents = events.filter(event => event.status === 'confirmed');
  
  const handleConfirmEvent = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: 'confirmed' } : event
    ));
    toast.success("Event added to calendar!");
  };
  
  const handleEditEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setShowForm(true);
    }
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
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          We've detected some new events from your messages. Review and add them to your calendar.
        </p>
      </header>
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="pending" className="relative">
            Pending 
            {pendingEvents.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {pendingEvents.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 mt-2">
          {pendingEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-lg font-medium mb-1">No pending events</h3>
              <p className="text-muted-foreground">
                Any detected events will appear here for your approval.
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
              variants={container}
              initial="hidden"
              animate="show"
            >
              {pendingEvents.map(event => (
                <motion.div key={event.id} variants={item}>
                  <EventCard
                    event={event}
                    onConfirm={handleConfirmEvent}
                    onEdit={handleEditEvent}
                    onReject={handleRejectEvent}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-2">
          {confirmedEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                  <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 2L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-lg font-medium mb-1">No upcoming events</h3>
              <p className="text-muted-foreground">
                Events you add to your calendar will appear here.
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
              variants={container}
              initial="hidden"
              animate="show"
            >
              {confirmedEvents.map(event => (
                <motion.div key={event.id} variants={item}>
                  <EventCard
                    event={event}
                    onConfirm={handleConfirmEvent}
                    onEdit={handleEditEvent}
                    onReject={handleRejectEvent}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
      
      <EventForm
        event={selectedEvent}
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedEvent(null);
        }}
        onSave={handleSaveEvent}
      />
      
      <AnimatePresence>
        {showNotification && pendingEvents.length > 0 && (
          <NotificationBubble
            event={pendingEvents[0]}
            onOpen={() => {
              setShowNotification(false);
              handleEditEvent(pendingEvents[0].id);
            }}
            onDismiss={() => setShowNotification(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Index;
