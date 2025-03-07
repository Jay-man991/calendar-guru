
import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import EventForm from '../components/EventForm';
import NotificationBubble from '../components/NotificationBubble';
import { AnimatePresence, motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import DashboardHeader from '../components/DashboardHeader';
import EventTabs from '../components/EventTabs';
import TesterSection from '../components/TesterSection';
import { EventType } from '../components/EventCard';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

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
  
  // Pull-to-refresh states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const MIN_PULL_DISTANCE = 80; // Minimum pull distance to trigger refresh
  
  const handleEditEvent = (id: string) => {
    const event = [...pendingEvents, ...confirmedEvents].find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setShowForm(true);
    }
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable pull-to-refresh when at the top of the page
    if (contentRef.current && contentRef.current.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
    } else {
      touchStartY.current = 0;
    }
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === 0) return;
    
    const touchY = e.touches[0].clientY;
    const distance = touchY - touchStartY.current;
    
    // Only allow pulling down, not up
    if (distance > 0) {
      // Apply a resistance factor to make the pull feel natural
      const newPullDistance = Math.min(distance * 0.5, MIN_PULL_DISTANCE * 1.5);
      setPullDistance(newPullDistance);
      
      // Prevent default when pulling down to avoid page scroll
      if (distance > 10) {
        e.preventDefault();
      }
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (pullDistance >= MIN_PULL_DISTANCE) {
      // Trigger refresh
      refreshEvents();
    }
    
    // Reset the pull distance with a smooth animation
    setPullDistance(0);
    touchStartY.current = 0;
  };

  // Handle manual scroll for desktop
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    
    // If scrolled to the top and user is still trying to scroll up
    if (target.scrollTop === 0 && !isRefreshing) {
      // We can detect mousewheel events here if needed
      // For now, we'll just show a toast suggesting the pull-to-refresh on mobile
      // or could add keyboard shortcut hint for desktop
    }
  };

  // Function to refresh events
  const refreshEvents = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Refresh logic here - you would typically call an API
      // For now, we'll just show a success toast
      toast.success("Events refreshed successfully");
      
    } catch (error) {
      toast.error("Failed to refresh events");
    } finally {
      setIsRefreshing(false);
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
      
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {/* Pull-to-refresh indicator */}
        <motion.div 
          className="flex justify-center items-center h-16 pointer-events-none"
          style={{ 
            marginTop: `-${16 - Math.min(pullDistance / 4, 16)}px`,
            opacity: pullDistance / MIN_PULL_DISTANCE
          }}
        >
          <motion.div
            animate={{ 
              rotate: isRefreshing ? 360 : 0 
            }}
            transition={{ 
              duration: 1,
              repeat: isRefreshing ? Infinity : 0,
              ease: "linear"
            }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <RefreshCw size={20} />
            <span className="text-sm font-medium">
              {isRefreshing ? "Refreshing..." : "Pull to refresh"}
            </span>
          </motion.div>
        </motion.div>
        
        <EventTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingEvents={pendingEvents}
          confirmedEvents={confirmedEvents}
          onConfirm={handleConfirmEvent}
          onEdit={handleEditEvent}
          onReject={handleRejectEvent}
        />
      </div>
      
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
