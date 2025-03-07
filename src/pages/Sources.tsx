
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, MessageSquare, MessageCircle, Smartphone, ExternalLink, CheckCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="datemate-card flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-opacity-10 mr-4 ${source.color.replace('text-', 'bg-')}`}>
          <source.icon className={`h-5 w-5 ${source.color}`} />
        </div>
        <div>
          <h3 className="font-medium">{source.name}</h3>
          <p className="text-sm text-muted-foreground">{source.description}</p>
          
          {source.connected && source.lastSynced && (
            <div className="flex items-center text-[10px] bg-gray-100 px-2 py-0.5 rounded-full mt-1 w-fit">
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
        </div>
      </div>
      <Switch
        checked={source.connected}
        onCheckedChange={() => toggleSourceConnection(source.id)}
      />
    </motion.div>
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Message Sources</h1>
          <p className="text-muted-foreground">
            Connect your messaging platforms to automatically detect events
          </p>
        </header>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <motion.div 
              className="grid gap-4"
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
              className="grid gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {sources.filter(s => s.connected).map(renderSourceItem)}
            </motion.div>
            
            {sources.filter(s => s.connected).length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-medium mb-1">No connected sources</h3>
                <p className="text-muted-foreground mb-4">
                  Connect messaging platforms to detect events automatically
                </p>
                <Button>Connect a source</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Sources;
