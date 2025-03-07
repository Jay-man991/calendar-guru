
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/10">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-md">
        <LoginForm />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">New to Calendar Guru?</p>
        <Link 
          to="/register" 
          className="inline-flex items-center mt-2 text-primary hover:underline font-medium"
        >
          Create an account
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="mt-4 text-center">
        <Link to="/tutorial" className="text-sm text-muted-foreground hover:underline">
          See how it works
        </Link>
      </div>
    </div>
  );
};

export default Login;
