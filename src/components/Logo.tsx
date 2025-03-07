
import React from 'react';
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn("flex items-center gap-1.5 font-semibold", sizeClasses[size], className)}>
      <div className="relative">
        <Calendar className="text-primary" />
        <Clock className="absolute text-accent w-3 h-3 -right-1 -bottom-1" />
      </div>
      <span>Calendar Guru</span>
    </div>
  );
};

export default Logo;
