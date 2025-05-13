
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
          {/* Base hexagon */}
          <polygon 
            points="60,10 110,40 110,80 60,110 10,80 10,40" 
            className="fill-black/20 dark:fill-black/40 stroke-[#8B5CF6] stroke-2"
          />
          
          {/* N Letterform */}
          <path 
            d="M40,40 L40,80 M40,40 L80,80 M80,40 L80,80" 
            className="stroke-[#0EA5E9] stroke-[6] stroke-linecap-round stroke-linejoin-round"
            strokeDasharray="180"
            strokeDashoffset="180"
            style={{
              animation: "dash 1.5s ease-in-out forwards",
            }}
          />
          
          {/* Neon circuit lines */}
          <path 
            d="M30,30 L20,20 M90,30 L100,20 M30,90 L20,100 M90,90 L100,100" 
            className="stroke-[#8B5CF6] stroke-2 opacity-80"
            strokeLinecap="round"
          />
          
          {/* Center circuit dot */}
          <circle cx="60" cy="60" r="5" className="fill-[#0EA5E9]">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 rounded-full blur-md bg-[#8B5CF6]/30" />
      </div>
      
      {variant === "default" && (
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] tracking-wider hidden sm:block">
          NeonFlux AI
        </span>
      )}
    </div>
  );
}
