
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Sources from "./pages/Sources";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import OnboardingPage from "./pages/OnboardingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Tutorial from "./pages/Tutorial";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAuthenticated && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Root route - redirect based on auth status and onboarding */}
              <Route 
                path="/" 
                element={
                  isAuthenticated
                    ? hasCompletedOnboarding
                      ? <Navigate to="/dashboard" replace />
                      : <Navigate to="/onboarding" replace />
                    : <Navigate to="/login" replace />
                } 
              />
              
              {/* Public routes */}
              <Route path="/login" element={
                isAuthenticated 
                  ? hasCompletedOnboarding 
                    ? <Navigate to="/dashboard" replace /> 
                    : <Navigate to="/onboarding" replace />
                  : <Login />
              } />
              
              <Route path="/register" element={
                isAuthenticated 
                  ? hasCompletedOnboarding 
                    ? <Navigate to="/dashboard" replace /> 
                    : <Navigate to="/onboarding" replace />
                  : <Register />
              } />
              
              {/* Tutorial and Payment routes */}
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/payment" element={<Payment />} />
              <Route 
                path="/onboarding" 
                element={
                  isAuthenticated 
                    ? <OnboardingPage /> 
                    : <Navigate to="/login" replace />
                } 
              />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/sources" element={<ProtectedRoute><Sources /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
