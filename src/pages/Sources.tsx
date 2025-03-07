
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, MessageSquare, MessageCircle, Smartphone, ExternalLink, CheckCheck, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface SourceType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  connected: boolean;
  description: string;
  lastSynced?: string;
}

const initialSources: SourceType[] = [
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'text-blue-500',
    connected: true,
    description: 'Scan your emails for event details and add them to your calendar',
    lastSynced: '2 minutes ago'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-500',
    connected: false,
    description: 'Connect WhatsApp to automatically detect events from your messages'
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: MessageSquare,
    color: 'text-purple-500',
    connected: false,
    description: 'Connect Facebook Messenger to keep track of event invites'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: Smartphone,
    color: 'text-orange-500',
    connected: true,
    description: 'Detect events from your text messages',
    lastSynced: '5 hours ago'
  }
];

const Sources = () => {
  const [sources, setSources] = useState<SourceType[]>(initialSources);
  const [refreshingSource, setRefreshingSource] = useState<string | null>(null);
  
  const toggleSourceConnection = (id: string) => {
    setSources(
      sources.map(source => 
        source.id === id 
          ? { 
              ...source, 
              connected: !source.connected,
              lastSynced: !source.connected ? 'just now' : undefined 
            } 
          : source
      )
    );
    
    const source = sources.find(s => s.id === id);
    if (source) {
      if (source.connected) {
        toast.info(`Disconnected from ${source.name}`);
      } else {
        toast.success(`Connected to ${source.name}`);
      }
    }
  };

  const refreshSource = async (id: string) => {
    setRefreshingSource(id);
    
    // Simulate a refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSources(
      sources.map(source => 
        source.id === id 
          ? { ...source, lastSynced: 'just now' } 
          : source
      )
    );
    
    const source = sources.find(s => s.id === id);
    if (source) {
      toast.success(`Refreshed ${source.name}`);
    }
    
    setRefreshingSource(null);
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

  const renderSourceItem = (source: SourceType) => (
    <motion.div 
      key={source.id}
      variants={item}
      className="w-full"
    >
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-opacity-10 ${source.color.replace('text-', 'bg-')}`}>
                <source.icon className={`h-5 w-5 ${source.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{source.name}</h3>
              </div>
            </div>
            <Switch
              checked={source.connected}
              onCheckedChange={() => toggleSourceConnection(source.id)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
          
          {source.connected && source.lastSynced && (
            <div className="flex items-center text-[10px] bg-gray-100 px-2 py-0.5 rounded-full w-fit">
              {refreshingSource === source.id ? (
                <div className="flex items-center">
                  <CheckCheck size={8} className="text-green-500 animate-spin mr-0.5" />
                  <span className="text-gray-600 font-medium">Syncing...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Button
                    onClick={() => refreshSource(source.id)}
                    className="p-0.5 h-4 w-4 bg-green-500 hover:bg-green-600 rounded-full mr-1 transition-colors flex items-center justify-center"
                    size="icon"
                    variant="default"
                  >
                    <CheckCheck size={8} className="text-white" />
                  </Button>
                  <Clock size={7} className="text-gray-500 mr-0.5" />
                  <span className="text-gray-600 font-medium">
                    {source.lastSynced.includes('minutes') || source.lastSynced.includes('hours') || source.lastSynced.includes('days') ?
                      `Last synced ${source.lastSynced}` :
                      source.lastSynced
                    }
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        {source.connected && (
          <CardFooter className="pt-0 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => refreshSource(source.id)}
              disabled={refreshingSource === source.id}
              className="text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              Refresh Now
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Message Sources</h1>
              <p className="text-muted-foreground">
                Connect your messaging platforms to automatically detect events
              </p>
            </div>
            
            <div className="flex items-center">
              <Button variant="outline" className="flex items-center gap-1 text-xs h-8">
                <Info className="h-3 w-3" />
                How It Works
              </Button>
            </div>
          </div>
        </header>
        
        <Card className="mb-6 border-blue-100 bg-blue-50/50">
          <CardContent className="p-4 flex gap-3 items-center">
            <div className="p-2 bg-blue-100 rounded-full text-blue-500">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-blue-800">
                Connect message sources to automatically scan for events. DateMate will analyze your messages and suggest events for your calendar.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <motion.div 
              className="grid gap-4 sm:grid-cols-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {sources.map(renderSourceItem)}
            </motion.div>
            
            <div className="pt-6">
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect another source
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="connected" className="space-y-4">
            <motion.div 
              className="grid gap-4 sm:grid-cols-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {sources.filter(s => s.connected).map(renderSourceItem)}
            </motion.div>
            
            {sources.filter(s => s.connected).length === 0 && (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">No connected sources</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Connect messaging platforms to detect events automatically
                  </p>
                  <Button>Connect a source</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Sources;

