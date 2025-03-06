
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import EventCard, { EventType } from './EventCard';

interface EventTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingEvents: EventType[];
  confirmedEvents: EventType[];
  onConfirm: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({
  activeTab,
  setActiveTab,
  pendingEvents,
  confirmedEvents,
  onConfirm,
  onEdit,
  onReject
}) => {
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
                  onConfirm={onConfirm}
                  onEdit={onEdit}
                  onReject={onReject}
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
                  onConfirm={onConfirm}
                  onEdit={onEdit}
                  onReject={onReject}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventTabs;
