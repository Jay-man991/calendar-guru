
import { EventType } from "@/components/EventCard";
import { v4 as uuidv4 } from "uuid";

// Regular expressions for detecting dates and times
const DATE_PATTERNS = [
  // MM/DD/YYYY or DD/MM/YYYY
  /\b(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{4}|\d{2})\b/,
  // Month DD, YYYY
  /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)[\.|\s]?\s+(\d{1,2})(?:st|nd|rd|th)?[,\s]+(\d{4})\b/i,
  // Next/This Monday, Tuesday, etc.
  /\b(next|this)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\b/i,
  // Tomorrow, Today
  /\b(tomorrow|today|tonight)\b/i,
];

const TIME_PATTERNS = [
  // HH:MM (AM/PM)
  /\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i,
  // at X (AM/PM)
  /\bat\s+(\d{1,2})\s*(am|pm)\b/i,
  // X o'clock
  /\b(\d{1,2})\s+o'clock\b/i,
];

const LOCATION_PATTERNS = [
  // "at [Location]"
  /\bat\s+([A-Za-z0-9\s]+(?:Restaurant|Café|Cafe|Park|Building|Center|Centre|Hotel|Office|Room|Hall|Theater|Theatre|Stadium|Arena|Street|Ave|Avenue|Road|Rd|Blvd|Boulevard|Plaza|Square|Mall|Library|Gallery|Museum|University|School|College|Hospital|Clinic|Store|Shop|Market|Supermarket|Gym|Pool|Beach|Lake|Mountain|Garden|Park))\b/i,
  // "in [Location]"
  /\bin\s+([A-Za-z\s]+(?:Room|Office|Building|Floor|Suite|Hall|Conference|Meeting))\b/i,
];

const EVENT_KEYWORDS = [
  'meeting', 'appointment', 'call', 'conference', 'lunch', 'dinner', 'breakfast', 
  'coffee', 'interview', 'session', 'webinar', 'workshop', 'class', 'lecture', 
  'presentation', 'exam', 'test', 'deadline', 'reservation', 'booking', 'flight',
  'birthday', 'anniversary', 'celebration', 'party', 'concert', 'show', 'game',
  'match', 'tournament', 'ceremony', 'wedding', 'funeral', 'exhibition', 'display',
  'demonstration', 'tour', 'trip', 'vacation', 'holiday', 'break', 'leave'
];

// Function to extract a date from text
const extractDate = (text: string): Date | null => {
  // This is a simplified implementation - in a real app, this would use a library like chrono-node
  const today = new Date();
  
  // Check for patterns
  for (const pattern of DATE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      if (match[0].toLowerCase().includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
      }
      
      if (match[0].toLowerCase().includes('today') || match[0].toLowerCase().includes('tonight')) {
        return today;
      }
      
      // Handle day names (next Monday, this Friday, etc.)
      if (match[1] && (match[1].toLowerCase() === 'next' || match[1].toLowerCase() === 'this')) {
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = match[2].toLowerCase();
        const dayIndex = dayNames.findIndex(d => dayName.startsWith(d.substring(0, 3)));
        
        if (dayIndex !== -1) {
          const resultDate = new Date(today);
          const currentDay = today.getDay();
          let daysToAdd = dayIndex - currentDay;
          
          if (daysToAdd <= 0) daysToAdd += 7;
          if (match[1].toLowerCase() === 'next') daysToAdd += 7;
          
          resultDate.setDate(today.getDate() + daysToAdd);
          return resultDate;
        }
      }
      
      // Try to parse as a date string
      try {
        const dateStr = match[0];
        const parsedDate = new Date(dateStr);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      } catch (e) {
        console.log("Error parsing date:", e);
      }
    }
  }
  
  return null;
};

// Function to extract time from text
const extractTime = (text: string): string | null => {
  for (const pattern of TIME_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      // Format as HH:MM
      let hour = parseInt(match[1]);
      let minute = match[2] ? parseInt(match[2]) : 0;
      let ampm = match[3]?.toLowerCase();
      
      // Handle AM/PM
      if (ampm === 'pm' && hour < 12) hour += 12;
      if (ampm === 'am' && hour === 12) hour = 0;
      
      // Format time as string
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
  }
  
  return null;
};

// Extract location from text
const extractLocation = (text: string): string | null => {
  for (const pattern of LOCATION_PATTERNS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
};

// Detect event title from text
const detectEventTitle = (text: string): string | null => {
  // Look for event keywords
  for (const keyword of EVENT_KEYWORDS) {
    if (text.toLowerCase().includes(keyword)) {
      // Extract a reasonable title around the keyword
      const index = text.toLowerCase().indexOf(keyword);
      const start = Math.max(0, index - 20);
      const end = Math.min(text.length, index + keyword.length + 30);
      let title = text.substring(start, end).trim();
      
      // Clean up the title
      if (title.length > 50) {
        title = title.substring(0, 47) + '...';
      }
      
      // Capitalize first letter
      return title.charAt(0).toUpperCase() + title.slice(1);
    }
  }
  
  return null;
};

export interface DetectedEvent {
  rawText: string;
  title: string | null;
  date: Date | null;
  time: string | null;
  location: string | null;
  confidence: number; // 0-100
}

export const parseMessage = (text: string, source: 'email' | 'whatsapp' | 'messenger' | 'sms'): DetectedEvent | null => {
  // Only process messages with potential event information
  let hasEventIndicator = false;
  
  // Check for event keywords
  for (const keyword of EVENT_KEYWORDS) {
    if (text.toLowerCase().includes(keyword)) {
      hasEventIndicator = true;
      break;
    }
  }
  
  // Check for date patterns
  if (!hasEventIndicator) {
    for (const pattern of DATE_PATTERNS) {
      if (pattern.test(text)) {
        hasEventIndicator = true;
        break;
      }
    }
  }
  
  if (!hasEventIndicator) {
    return null;
  }
  
  // Extract event components
  const title = detectEventTitle(text);
  const date = extractDate(text);
  const time = extractTime(text);
  const location = extractLocation(text);
  
  // Calculate confidence score based on how many components were detected
  let confidence = 0;
  if (title) confidence += 25;
  if (date) confidence += 35;
  if (time) confidence += 25;
  if (location) confidence += 15;
  
  // Only return events with sufficient data
  if (confidence >= 60) {
    return {
      rawText: text,
      title,
      date,
      time,
      location,
      confidence
    };
  }
  
  return null;
};

export const createEventFromDetection = (detection: DetectedEvent, source: 'email' | 'whatsapp' | 'messenger' | 'sms'): EventType => {
  return {
    id: uuidv4(),
    title: detection.title || 'Untitled Event',
    date: detection.date || new Date(),
    time: detection.time || '12:00',
    location: detection.location || '',
    description: detection.rawText,
    source,
    status: 'pending'
  };
};
