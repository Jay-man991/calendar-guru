
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  Calendar, 
  Smartphone,
  Zap,
  Mail
} from 'lucide-react';

const Notifications = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [detectionTime, setDetectionTime] = useState([30]);
  const [reminderTimes, setReminderTimes] = useState([60]);
  
  const handleSaveSettings = () => {
    toast.success("Notification preferences saved!");
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
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
          <p className="text-muted-foreground">
            Customize how and when you receive notifications about events
          </p>
        </header>
        
        <motion.div 
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.section variants={item} className="datemate-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <Bell className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Notification Methods</h3>
                  <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push-notifications">Push notifications</Label>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notifications">Email notifications</Label>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
            </div>
          </motion.section>
          
          <motion.section variants={item} className="datemate-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <Zap className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Event Detection</h3>
                  <p className="text-sm text-muted-foreground">Configure when to detect events from messages</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="detection-time">Detection frequency (minutes)</Label>
                  <span className="text-sm font-medium">{detectionTime[0]}</span>
                </div>
                <Slider
                  id="detection-time"
                  min={5}
                  max={60}
                  step={5}
                  value={detectionTime}
                  onValueChange={setDetectionTime}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Frequent (5m)</span>
                  <span>Less frequent (60m)</span>
                </div>
              </div>
            </div>
          </motion.section>
          
          <motion.section variants={item} className="datemate-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Reminder Settings</h3>
                  <p className="text-sm text-muted-foreground">Set when you'd like to be reminded of events</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="reminder-time">Default reminder time (minutes before)</Label>
                  <span className="text-sm font-medium">{reminderTimes[0]}</span>
                </div>
                <Slider
                  id="reminder-time"
                  min={15}
                  max={120}
                  step={15}
                  value={reminderTimes}
                  onValueChange={setReminderTimes}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Just before (15m)</span>
                  <span>Well before (120m)</span>
                </div>
              </div>
            </div>
          </motion.section>
          
          <motion.div variants={item} className="flex justify-end">
            <Button onClick={handleSaveSettings} className="btn-animation">
              Save Preferences
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Notifications;
