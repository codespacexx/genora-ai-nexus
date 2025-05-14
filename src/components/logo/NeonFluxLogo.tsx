
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
          {/* Premium circle background */}
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            className="fill-background stroke-brand-accent" 
            strokeWidth="2.5"
          />
          
          {/* Letter G */}
          <path 
            d="M40,40 A25,25 0 1,0 40,80 L40,60 L60,60" 
            className="stroke-brand-accent" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Subtle accent details */}
          <circle cx="40" cy="40" r="4" className="fill-brand-accent opacity-70" />
          <circle cx="60" cy="60" r="4" className="fill-brand-accent opacity-70" />
        </svg>
      </div>
      
      {variant === "default" && (
        <div className="flex flex-col justify-center">
          <span className="text-xl font-semibold tracking-wide hidden sm:block">
            Georana<span className="text-brand-accent font-bold">AI</span>
          </span>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Enterprise Edition
          </span>
        </div>
      )}
    </div>
  );
}
