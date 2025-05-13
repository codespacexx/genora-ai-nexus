
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "icon-only";
}

export function NeonFluxLogo({ 
  className, 
  size = "md", 
  variant = "default" 
}: LogoProps) {
  // Size mappings for the SVG
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative", sizeMap[size])}>
        <svg 
          viewBox="0 0 120 120" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Base circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="52" 
            fill="#1A1D23" 
            className="stroke-brand-accent" 
            strokeWidth="2"
          />
          
          {/* N letterform - modern, professional */}
          <path 
            d="M40,40 L40,80 M40,40 L80,80 M80,40 L80,80" 
            className="stroke-brand-accent" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Subtle accent details */}
          <circle cx="40" cy="40" r="3" className="fill-brand-accent opacity-80" />
          <circle cx="80" cy="80" r="3" className="fill-brand-accent opacity-80" />
        </svg>
      </div>
      
      {variant === "default" && (
        <span className="text-xl font-semibold font-inter tracking-wide hidden sm:block">
          NeonFlux AI
        </span>
      )}
    </div>
  );
}
