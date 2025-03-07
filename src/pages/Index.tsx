
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
import { RefreshCw, Calendar, MessageCircle, Mail, Smartphone, Bell } from 'lucide-react';
import { toast } from 'sonner';
import CalendarView from '../components/CalendarView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const {
    events,
    pendingEvents,
    confirmedEvents,
    getLastSyncText,
    handleConfirmEvent,
    handleRejectEvent,
    handleSaveEvent,
    handleNewEventDetected,
    refreshEvents,
    connectToAPI
  } = useEvents();
  
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [showTester, setShowTester] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isConnecting, setIsConnecting] = useState(false);

  // Connected services state
  const [connectedServices, setConnectedServices] = useState({
    google: false,
    outlook: false,
    whatsapp: false,
    messenger: false
  });

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
  
  const handleCalendarEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setShowForm(true);
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
    }
  };

  // Function to refresh events
  const handleRefreshEvents = async () => {
    setIsRefreshing(true);
    try {
      // Perform the actual refresh
      await refreshEvents();
      toast.success("Reminders refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh reminders");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Connect to a service
  const handleConnectService = async (service: string) => {
    setIsConnecting(true);
    try {
      const success = await connectToAPI(service);
      if (success) {
        setConnectedServices(prev => ({
          ...prev,
          [service.toLowerCase()]: true
        }));
      }
    } catch (error) {
      toast.error(`Failed to connect to ${service}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Layout lastSyncText={getLastSyncText()} onRefresh={refreshEvents}>
      <DashboardHeader showTester={showTester} setShowTester={setShowTester} />

      <TesterSection showTester={showTester} onEventDetected={handleNewEventDetected} />
      
      <div 
        ref={contentRef} 
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd} 
        onScroll={handleScroll} 
        className=""
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
            className="flex items-center gap-2 text-gray-500"
          >
            <RefreshCw size={20} />
            <span className="text-sm font-medium">
              {isRefreshing ? "Refreshing..." : "Pull to refresh"}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Connected Services */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Connected Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button
                variant={connectedServices.google ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2 justify-center"
                onClick={() => handleConnectService('Google')}
                disabled={isConnecting || connectedServices.google}
              >
                <Mail className="h-4 w-4" />
                {connectedServices.google ? "Connected" : "Google"}
              </Button>
              
              <Button
                variant={connectedServices.outlook ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2 justify-center"
                onClick={() => handleConnectService('Outlook')}
                disabled={isConnecting || connectedServices.outlook}
              >
                <Calendar className="h-4 w-4" />
                {connectedServices.outlook ? "Connected" : "Outlook"}
              </Button>
              
              <Button
                variant={connectedServices.whatsapp ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2 justify-center"
                onClick={() => handleConnectService('WhatsApp')}
                disabled={isConnecting || connectedServices.whatsapp}
              >
                <MessageCircle className="h-4 w-4" />
                {connectedServices.whatsapp ? "Connected" : "WhatsApp"}
              </Button>
              
              <Button
                variant={connectedServices.messenger ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2 justify-center"
                onClick={() => handleConnectService('Messenger')}
                disabled={isConnecting || connectedServices.messenger}
              >
                <Smartphone className="h-4 w-4" />
                {connectedServices.messenger ? "Connected" : "Messenger"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="events" className="flex-1 flex items-center gap-1 justify-center">
              <Bell className="h-4 w-4" />
              Reminders
              {pendingEvents.length > 0 && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {pendingEvents.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1 flex items-center gap-1 justify-center">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="mt-0">
            <EventTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              pendingEvents={pendingEvents} 
              confirmedEvents={confirmedEvents} 
              onConfirm={handleConfirmEvent} 
              onEdit={handleEditEvent} 
              onReject={handleRejectEvent} 
            />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            <CalendarView 
              events={events} 
              currentDate={currentDate} 
              onDateChange={setCurrentDate} 
              onEventClick={handleCalendarEventClick} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Button
        className="fixed bottom-20 right-6 rounded-full h-12 w-12 shadow-lg flex items-center justify-center p-0"
        onClick={() => {
          setSelectedEvent(null);
          setShowForm(true);
        }}
      >
        <Bell className="h-5 w-5" />
      </Button>
      
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
