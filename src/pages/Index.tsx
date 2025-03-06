
import React, { useState } from 'react';
import Layout from '../components/Layout';
import EventForm from '../components/EventForm';
import NotificationBubble from '../components/NotificationBubble';
import { AnimatePresence } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import DashboardHeader from '../components/DashboardHeader';
import EventTabs from '../components/EventTabs';
import TesterSection from '../components/TesterSection';
import { EventType } from '../components/EventCard';

const Index = () => {
  const {
    pendingEvents,
    confirmedEvents,
    handleConfirmEvent,
    handleRejectEvent,
    handleSaveEvent,
    handleNewEventDetected
  } = useEvents();
  
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [showTester, setShowTester] = useState(false);
  
  const handleEditEvent = (id: string) => {
    const event = [...pendingEvents, ...confirmedEvents].find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setShowForm(true);
    }
  };

  return (
    <Layout>
      <DashboardHeader 
        showTester={showTester} 
        setShowTester={setShowTester} 
      />

      <TesterSection 
        showTester={showTester} 
        onEventDetected={handleNewEventDetected} 
      />
      
      <EventTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingEvents={pendingEvents}
        confirmedEvents={confirmedEvents}
        onConfirm={handleConfirmEvent}
        onEdit={handleEditEvent}
        onReject={handleRejectEvent}
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
