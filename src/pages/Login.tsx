
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/10">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
