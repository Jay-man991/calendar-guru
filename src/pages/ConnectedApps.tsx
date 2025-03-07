
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Globe, 
  Lock, 
  ExternalLink, 
  Calendar, 
  ShieldCheck,
  Mail,
  Wallet,
  Key,
  RefreshCw
} from 'lucide-react';

const ConnectedApps = () => {
  const [activeTab, setActiveTab] = useState('payment');
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  
  // Connected status for various services
  const [connectedApps, setConnectedApps] = useState({
    stripe: false,
    paypal: false,
    googleSignIn: false,
    googleCalendar: false,
    slack: false,
    zoom: false
  });
  
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
  
  // Handle connecting to a service
  const handleConnect = (service: keyof typeof connectedApps) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnectedApps(prev => ({
        ...prev,
        [service]: true
      }));
      
      setIsConnecting(false);
      toast.success(`Successfully connected to ${service}!`);
    }, 1500);
  };
  
  // Handle disconnecting from a service
  const handleDisconnect = (service: keyof typeof connectedApps) => {
    setIsConnecting(true);
    
    // Simulate disconnection process
    setTimeout(() => {
      setConnectedApps(prev => ({
        ...prev,
        [service]: false
      }));
      
      setIsConnecting(false);
      toast.info(`Disconnected from ${service}`);
    }, 800);
  };
  
  // Handle API key save
  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    toast.success("API key saved successfully");
    // In a real app, you'd securely store this
    console.log("API key saved:", apiKey);
    setApiKey('');
  };
  
  // Handle webhook save
  const handleSaveWebhook = () => {
    if (!webhookUrl.trim() || !webhookUrl.startsWith('http')) {
      toast.error("Please enter a valid webhook URL");
      return;
    }
    
    toast.success("Webhook URL saved successfully");
    console.log("Webhook URL saved:", webhookUrl);
    setWebhookUrl('');
  };
  
  // Payment integration cards
  const renderPaymentCards = () => (
    <motion.div 
      className="grid gap-4 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <CreditCard className="h-5 w-5 text-vibrant-purple" />
                </div>
                <div>
                  <CardTitle className="text-lg">Stripe</CardTitle>
                  <CardDescription>Credit card payments</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Accept credit card payments worldwide with Stripe's secure payment processing.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedApps.stripe ? "outline" : "rainbow"}
              className="w-full"
              onClick={() => connectedApps.stripe ? handleDisconnect('stripe') : handleConnect('stripe')}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {connectedApps.stripe ? 'Disconnect' : 'Connect Stripe'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Wallet className="h-5 w-5 text-vibrant-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">PayPal</CardTitle>
                  <CardDescription>PayPal payments</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Let your customers pay with PayPal for a fast and secure checkout experience.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedApps.paypal ? "outline" : "connect"}
              className="w-full"
              onClick={() => connectedApps.paypal ? handleDisconnect('paypal') : handleConnect('paypal')}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {connectedApps.paypal ? 'Disconnect' : 'Connect PayPal'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
  
  // Authentication integration cards
  const renderAuthCards = () => (
    <motion.div 
      className="grid gap-4 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Mail className="h-5 w-5 text-vibrant-red" />
                </div>
                <div>
                  <CardTitle className="text-lg">Google Sign-In</CardTitle>
                  <CardDescription>OAuth authentication</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Allow users to sign in with their Google account for a quick and secure authentication.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedApps.googleSignIn ? "outline" : "connect"}
              className="w-full"
              onClick={() => connectedApps.googleSignIn ? handleDisconnect('googleSignIn') : handleConnect('googleSignIn')}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {connectedApps.googleSignIn ? 'Disconnect' : 'Connect Google Sign-In'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-vibrant-green" />
                </div>
                <div>
                  <CardTitle className="text-lg">Custom Auth API</CardTitle>
                  <CardDescription>JWT authentication</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Integrate with your custom authentication API for full control over user management.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter API endpoint"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="vibrant"
              className="w-full"
              onClick={handleSaveWebhook}
            >
              Save Auth Endpoint
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
  
  // API integration cards
  const renderApiCards = () => (
    <motion.div 
      className="grid gap-4 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Calendar className="h-5 w-5 text-vibrant-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Google Calendar</CardTitle>
                  <CardDescription>Calendar synchronization</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Sync events with Google Calendar to keep everything organized in one place.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedApps.googleCalendar ? "outline" : "connect"}
              className="w-full"
              onClick={() => connectedApps.googleCalendar ? handleDisconnect('googleCalendar') : handleConnect('googleCalendar')}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {connectedApps.googleCalendar ? 'Disconnect' : 'Connect Google Calendar'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Key className="h-5 w-5 text-vibrant-purple" />
                </div>
                <div>
                  <CardTitle className="text-lg">Custom API</CardTitle>
                  <CardDescription>API key integration</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect to any third-party API by entering your API key.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="rainbow"
              className="w-full"
              onClick={handleSaveApiKey}
            >
              Save API Key
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="md:col-span-2">
        <Card className="border-2 border-dashed hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <ExternalLink className="h-5 w-5 text-vibrant-green" />
                </div>
                <div>
                  <CardTitle className="text-lg">Add More Integrations</CardTitle>
                  <CardDescription>Slack, Zoom, and more</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore our marketplace to find more integrations for your workflow.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline"
              className="w-full"
            >
              Explore Integrations Marketplace
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Connected Apps</h1>
          <p className="text-muted-foreground">
            Integrate your favorite services and APIs with DateMate
          </p>
        </header>
        
        <Tabs defaultValue="payment" className="mb-8 w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="payment" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span>Authentication</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment" className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Connect payment gateways to accept payments from your users. All connections are secure and encrypted.
              </p>
            </div>
            {renderPaymentCards()}
          </TabsContent>
          
          <TabsContent value="auth" className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Set up authentication providers to enable users to sign in with their preferred accounts.
              </p>
            </div>
            {renderAuthCards()}
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Connect to third-party APIs to extend DateMate's functionality and integrate with other services.
              </p>
            </div>
            {renderApiCards()}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ConnectedApps;
