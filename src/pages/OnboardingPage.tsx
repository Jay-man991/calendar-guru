
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '../components/Logo';
import { motion } from 'framer-motion';
import { Check, ChevronRight, MessageCircle, Mail, Smartphone, Calendar } from 'lucide-react';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Calendar Guru',
    description: 'Your personal date and event assistant that automatically detects events from your messages.',
    icon: Calendar
  },
  {
    id: 'permissions',
    title: 'Connect Your Message Sources',
    description: 'DateMate needs access to your messages to detect events. We value your privacy and only scan for event details.',
    icon: MessageCircle
  },
  {
    id: 'calendar',
    title: 'Calendar Integration',
    description: 'Connect your favorite calendar to seamlessly add detected events.',
    icon: Calendar
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'DateMate is ready to help you keep track of your events.',
    icon: Check
  }
];

const platforms = [
  { id: 'email', name: 'Email', icon: Mail, color: 'text-blue-500' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
  { id: 'sms', name: 'SMS', icon: Smartphone, color: 'text-orange-500' }
];

const calendars = [
  { id: 'google', name: 'Google Calendar', logo: '/google-calendar.svg' },
  { id: 'apple', name: 'Apple Calendar', logo: '/apple-calendar.svg' },
  { id: 'outlook', name: 'Outlook Calendar', logo: '/outlook-calendar.svg' }
];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['email']);
  const [selectedCalendar, setSelectedCalendar] = useState('google');
  const navigate = useNavigate();
  
  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };
  
  const step = steps[currentStep];
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b">
        <Logo size="md" />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div 
                key={s.id}
                className={`relative flex-1 ${i < steps.length - 1 ? 'after:content-[""] after:h-[2px] after:w-full after:absolute after:top-3 after:left-0 after:right-0 after:bg-muted after:z-0' : ''}`}
              >
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 mx-auto ${
                    i < currentStep ? 'bg-primary' : i === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  {i < currentStep ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : (
                    <span className={`text-xs ${i === currentStep ? 'text-white' : 'text-muted-foreground'}`}>
                      {i + 1}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="onboarding-step"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <step.icon className="h-8 w-8" />
            </div>
            
            <h1 className="text-2xl font-bold mt-4">{step.title}</h1>
            <p className="text-muted-foreground">{step.description}</p>
            
            {step.id === 'permissions' && (
              <div className="w-full mt-6 space-y-3">
                {platforms.map(platform => (
                  <div
                    key={platform.id}
                    className={`platform-card ${selectedPlatforms.includes(platform.id) ? 'active' : ''}`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className={`p-2 rounded-full ${platform.color.replace('text-', 'bg-')}/10 mr-3`}>
                      <platform.icon className={`h-5 w-5 ${platform.color}`} />
                    </div>
                    <span>{platform.name}</span>
                    
                    {selectedPlatforms.includes(platform.id) && (
                      <div className="ml-auto">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                <p className="text-xs text-muted-foreground mt-2">
                  Calendar Guru will only scan for event details and never store the content of your messages.
                </p>
              </div>
            )}
            
            {step.id === 'calendar' && (
              <div className="w-full mt-6 space-y-3">
                {calendars.map(calendar => (
                  <div
                    key={calendar.id}
                    className={`platform-card ${selectedCalendar === calendar.id ? 'active' : ''}`}
                    onClick={() => setSelectedCalendar(calendar.id)}
                  >
                    <div className="w-8 h-8 mr-3 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <span>{calendar.name}</span>
                    
                    {selectedCalendar === calendar.id && (
                      <div className="ml-auto">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {step.id === 'complete' && (
              <div className="w-full mt-6">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-4"
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-12 w-12 text-green-600" />
                  </div>
                </motion.div>
                <p className="text-center text-muted-foreground mb-4">
                  You're ready to start managing your events effortlessly with Calendar Guru!
                </p>
              </div>
            )}
            
            <Button 
              onClick={handleNext} 
              className="mt-8 btn-animation"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Continue
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                'Get Started'
              )}
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;
