
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Mail, MessageSquare } from "lucide-react";

type TutorialSlide = {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
};

const TutorialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides: TutorialSlide[] = [
    {
      title: "Never Miss an Important Event",
      description: "DateMate automatically detects events in your messages and emails, so you don't have to manually add them to your calendar.",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "All Your Events in One Place",
      description: "See all your upcoming events in a clean, organized calendar view that makes planning your schedule a breeze.",
      icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
      title: "Seamless Integration",
      description: "Connect DateMate to your favorite messaging and email platforms for automatic event detection across all your communications.",
      icon: <Mail className="h-10 w-10 text-primary" />,
    },
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/payment');
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const skipTutorial = () => {
    navigate('/payment');
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            {slides[currentSlide].icon}
            <h2 className="text-2xl font-bold mt-6 mb-2">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground">{slides[currentSlide].description}</p>
          </div>
          
          {slides[currentSlide].imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img 
                src={slides[currentSlide].imageUrl} 
                alt={slides[currentSlide].title} 
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="flex justify-center gap-2 my-8">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex justify-between items-center border-t">
        <div>
          {currentSlide > 0 ? (
            <Button variant="ghost" onClick={prevSlide}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <Button variant="ghost" onClick={skipTutorial}>
              Skip
            </Button>
          )}
        </div>
        
        <Button onClick={nextSlide}>
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TutorialSlider;
