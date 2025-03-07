
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import EventCard, { EventType } from './EventCard';
import { Calendar, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

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
      <TabsList className="flex h-auto p-1 mb-6 bg-gray-100 rounded-lg">
        <TabsTrigger 
          value="pending" 
          className="flex-1 flex items-center justify-center gap-1 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          <ClipboardList className="h-4 w-4" />
          <span>Review Events</span>
          {pendingEvents.length > 0 && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
              {pendingEvents.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="upcoming" 
          className="flex-1 flex items-center justify-center gap-1 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          <Calendar className="h-4 w-4" />
          <span>Upcoming</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="mt-2">
        {pendingEvents.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <ClipboardList className="h-8 w-8 text-gray-400" />
                </motion.div>
              </div>
              <h3 className="text-lg font-medium mb-1">No pending events</h3>
              <p className="text-gray-500 max-w-xs mb-4">
                Any detected events will appear here for your approval.
              </p>
              <Button variant="outline" size="sm">
                Manually Add Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {pendingEvents.map(event => (
              <motion.div key={event.id} variants={item}>
                <EventCard
                  event={{
                    ...event,
                    confidence: event.id === '1' ? 95 : event.id === '2' ? 90 : 85
                  }}
                  onConfirm={onConfirm}
                  onEdit={onEdit}
                  onReject={onReject}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-2">
        {confirmedEvents.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                  <Calendar className="h-8 w-8 text-gray-400" />
                </motion.div>
              </div>
              <h3 className="text-lg font-medium mb-1">No upcoming events</h3>
              <p className="text-gray-500 max-w-xs mb-4">
                Events you add to your calendar will appear here.
              </p>
              <Button variant="outline" size="sm">
                Manually Add Event
              </Button>
            </CardContent>
          </Card>
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
                  className="h-full"
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
