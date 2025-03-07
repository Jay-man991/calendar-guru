
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/10">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-md">
        <RegisterForm />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">Already have an account?</p>
        <Link 
          to="/login" 
          className="inline-flex items-center mt-2 text-primary hover:underline font-medium"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Sign in
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

export default Register;
