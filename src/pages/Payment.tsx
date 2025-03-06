
import React from 'react';
import PricingPlans from '../components/payment/PricingPlans';
import Logo from '../components/Logo';

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 border-b">
        <div className="container mx-auto flex justify-center">
          <Logo size="md" />
        </div>
      </header>
      
      <main className="container mx-auto">
        <PricingPlans />
      </main>
    </div>
  );
};

export default Payment;
