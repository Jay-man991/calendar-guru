import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Calendar, 
  Shield, 
  Sun, 
  Moon, 
  Laptop,
  LogOut
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Settings = () => {
  const [syncCalendar, setSyncCalendar] = useState(true);
  const [defaultCalendar, setDefaultCalendar] = useState("google");
  const [userConsent, setUserConsent] = useState(true);
  const [theme, setTheme] = useState("system");
  const { logout } = useAuth();
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
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
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Customize your DateMate experience
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
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
                <Calendar className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Calendar Integration</h3>
                  <p className="text-sm text-muted-foreground">Configure how DateMate interacts with your calendars</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-calendar">Sync with external calendars</Label>
                <Switch
                  id="sync-calendar"
                  checked={syncCalendar}
                  onCheckedChange={setSyncCalendar}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-calendar">Default calendar</Label>
                <Select
                  value={defaultCalendar}
                  onValueChange={setDefaultCalendar}
                >
                  <SelectTrigger id="default-calendar" className="w-full">
                    <SelectValue placeholder="Select calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Calendar</SelectItem>
                    <SelectItem value="apple">Apple Calendar</SelectItem>
                    <SelectItem value="outlook">Outlook Calendar</SelectItem>
                    <SelectItem value="datemate">DateMate (Local)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.section>
          
          <motion.section variants={item} className="datemate-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <Shield className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Privacy & Data</h3>
                  <p className="text-sm text-muted-foreground">Manage how your data is used</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="user-consent">Allow message scanning for events</Label>
                <Switch
                  id="user-consent"
                  checked={userConsent}
                  onCheckedChange={setUserConsent}
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                DateMate scans message content solely to detect events. Your messages are processed locally and are never stored or shared.
              </p>
              
              <div className="pt-2">
                <Button variant="outline" size="sm">
                  View Privacy Policy
                </Button>
              </div>
            </div>
          </motion.section>
          
          <motion.section variants={item} className="datemate-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <SettingsIcon className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize the look and feel</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 ${theme === 'light' ? 'border-primary' : ''}`}
                onClick={() => setTheme('light')}
              >
                <Sun className="h-6 w-6 mb-1" />
                <span className="text-xs">Light</span>
              </Button>
              
              <Button
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 ${theme === 'dark' ? 'border-primary' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-6 w-6 mb-1" />
                <span className="text-xs">Dark</span>
              </Button>
              
              <Button
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 ${theme === 'system' ? 'border-primary' : ''}`}
                onClick={() => setTheme('system')}
              >
                <Laptop className="h-6 w-6 mb-1" />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </motion.section>
          
          <motion.div variants={item} className="flex justify-end">
            <Button onClick={handleSaveSettings} className="btn-animation">
              Save Settings
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Settings;
