
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type PlanFeature = {
  name: string;
  included: boolean;
};

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  popular?: boolean;
  features: PlanFeature[];
};

const PricingPlans = () => {
  const navigate = useNavigate();
  
  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "$0",
      description: "Basic plan for casual users",
      buttonText: "Get Started",
      features: [
        { name: "5 events per month", included: true },
        { name: "Basic event detection", included: true },
        { name: "Calendar sync", included: true },
        { name: "Email notifications", included: false },
        { name: "Advanced event analysis", included: false },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Best for regular users",
      buttonText: "Subscribe",
      popular: true,
      features: [
        { name: "Unlimited events", included: true },
        { name: "Advanced event detection", included: true },
        { name: "Calendar sync", included: true },
        { name: "Email notifications", included: true },
        { name: "Advanced event analysis", included: true },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
      ]
    },
    {
      name: "Enterprise",
      price: "$29.99",
      description: "For power users and business",
      buttonText: "Contact Sales",
      features: [
        { name: "Unlimited events", included: true },
        { name: "Advanced event detection", included: true },
        { name: "Calendar sync", included: true },
        { name: "Email notifications", included: true },
        { name: "Advanced event analysis", included: true },
        { name: "Custom integrations", included: true },
        { name: "Priority support", included: true },
      ]
    }
  ];

  const handleSubscribe = (planName: string) => {
    // Simulating payment process
    toast.success(`Successfully subscribed to ${planName} plan!`);
    navigate('/');
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the best plan that fits your needs. All plans include our core features to help you manage your events effectively.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`rounded-lg border bg-card overflow-hidden ${
              plan.popular ? 'ring-2 ring-primary shadow-lg relative' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.name !== "Free" && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              
              <Button 
                className="mt-6 w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </div>
            
            <div className="p-6 bg-muted/50">
              <p className="font-medium mb-4">Features include:</p>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground mt-0.5" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
