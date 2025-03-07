
import React from 'react';
import Layout from '../components/Layout';
import { useEvents } from '../hooks/useEvents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EventCard from '../components/EventCard';
import { Badge } from '@/components/ui/badge';
import ManualEventDetection from '../components/ManualEventDetection';

const Notifications = () => {
  const { 
    pendingEvents, 
    confirmedEvents, 
    handleConfirmEvent, 
    handleRejectEvent,
    handleSaveEvent,
    handleNewEventDetected
  } = useEvents();

  // Use handleSaveEvent as the onEdit handler
  const handleEdit = (id: string) => {
    // For now, this is a placeholder. We'll implement actual edit functionality later
    console.log(`Edit event with id: ${id}`);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        <ManualEventDetection onEventDetected={handleNewEventDetected} />
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="pending" className="flex gap-2 items-center">
              Pending
              {pendingEvents.length > 0 && (
                <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center rounded-full text-xs">
                  {pendingEvents.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingEvents.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No pending notifications
                </CardContent>
              </Card>
            ) : (
              pendingEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onConfirm={handleConfirmEvent}
                  onReject={handleRejectEvent}
                  onEdit={handleEdit}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="space-y-4">
            {confirmedEvents.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No confirmed events
                </CardContent>
              </Card>
            ) : (
              confirmedEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onConfirm={handleConfirmEvent}
                  onReject={handleRejectEvent}
                  onEdit={handleEdit}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
