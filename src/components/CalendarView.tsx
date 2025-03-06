
import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventType } from './EventCard';

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

  return (
    <div className="w-full animate-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevWeek}
            className="btn-animation"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextWeek}
            className="btn-animation"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => (
          <div key={i} className="flex flex-col">
            <div className="text-center mb-2">
              <p className="text-sm font-medium">{format(day, 'EEE')}</p>
              <div 
                className={cn(
                  "w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm",
                  isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
            
            <div className="min-h-[180px] border rounded-lg p-2 bg-card/50 space-y-1 overflow-y-auto">
              {getDayEvents(day).map((event) => (
                <div
                  key={event.id}
                  className="px-2 py-1.5 text-xs bg-primary/10 rounded cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => onEventClick(event)}
                >
                  <p className="font-medium truncate">{event.title}</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
