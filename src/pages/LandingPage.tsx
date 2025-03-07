
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import WaitlistForm from '@/components/WaitlistForm';
import { ArrowRight, Calendar, Clock, MessageSquare, Bell } from 'lucide-react';

const LandingPage = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="container py-6 flex items-center justify-between">
        <Logo size="md" />
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Never miss an important event with <span className="text-primary">DateMate</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatically detect events from your messages and add them to your calendar - no more manual entry or missed appointments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {showWaitlist ? (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <WaitlistForm onSuccess={() => setShowWaitlist(false)} />
              </div>
            ) : (
              <>
                <Button size="lg" onClick={() => setShowWaitlist(true)}>
                  Join the waitlist
                </Button>
                <Link to="/tutorial">
                  <Button size="lg" variant="outline">
                    See how it works <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 bg-muted/20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Detection</h3>
            <p className="text-muted-foreground">
              Automatically detects events from your messages, emails, and chats.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Calendar Integration</h3>
            <p className="text-muted-foreground">
              Seamlessly adds detected events to your calendar with just one click.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
            <p className="text-muted-foreground">
              Get notified at the right time so you never miss an important event.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-card p-10 rounded-xl border shadow-sm">
          <h2 className="text-3xl font-bold">Ready to never miss an event again?</h2>
          <p className="text-xl text-muted-foreground">
            Join our waitlist to be the first to know when DateMate launches.
          </p>
          <Button size="lg" onClick={() => setShowWaitlist(true)}>
            Join the waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DateMate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
