
import React from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventType } from './EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CalendarViewProps {
  events: EventType[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick: (event: EventType) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  events, 
  currentDate, 
  onDateChange,
  onEventClick 
}) => {
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(startOfWeek(currentDate), i);
    return day;
  });

  const nextWeek = () => {
    onDateChange(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    onDateChange(addDays(currentDate, -7));
  };

  const getDayEvents = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day) && event.status === 'confirmed');
  };

  // Get upcoming reminders for the sidebar
  const getUpcomingReminders = () => {
    return events
      .filter(event => event.status === 'confirmed' && event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  const upcomingReminders = getUpcomingReminders();

  return (
    <div className="w-full animate-in-up">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <p className="text-xs text-muted-foreground">
                {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d')}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={prevWeek}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDateChange(new Date())}
                className="h-8 text-xs"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextWeek}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-center mb-1">
                  <p className="text-xs font-medium">{format(day, 'EEE')}</p>
                  <div 
                    className={cn(
                      "w-6 h-6 mx-auto flex items-center justify-center rounded-full text-xs",
                      isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                    )}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
                
                <div className="min-h-[120px] border rounded-lg p-1 bg-card/50 space-y-1 overflow-y-auto text-xs">
                  {getDayEvents(day).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "px-1.5 py-1 rounded cursor-pointer transition-colors flex items-center gap-1",
                        event.isReminder 
                          ? "bg-blue-50 hover:bg-blue-100" 
                          : "bg-primary/10 hover:bg-primary/20"
                      )}
                      onClick={() => onEventClick(event)}
                    >
                      {event.isReminder && (
                        <Bell className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      )}
                      <div className="overflow-hidden">
                        <p className="font-medium truncate text-[10px]">{event.title}</p>
                        <p className="text-muted-foreground text-[10px]">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length > 0 ? (
                <div className="space-y-2">
                  {upcomingReminders.map((reminder) => (
                    <div 
                      key={reminder.id}
                      className="p-2 bg-blue-50 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => onEventClick(reminder)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{reminder.title}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(reminder);
                          }}
                        >
                          <Bell className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <span>{format(reminder.date, 'EEE, MMM d')}</span>
                        <span>•</span>
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No upcoming reminders
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
