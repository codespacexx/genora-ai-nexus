
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", withText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  
  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <Link 
      to="/dashboard" 
      className={`flex items-center gap-2.5 font-bold ${className}`}
    >
      <svg 
        className={`${sizes[size]}`}
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="60" 
          cy="60" 
          r="54" 
          fill="url(#paint0_linear)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <path 
          d="M40,40 A25,25 0 1,0 40,80 L40,60 L60,60"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="40" cy="40" r="4" fill="#FFFFFF" fillOpacity="0.7" />
        <circle cx="60" cy="60" r="4" fill="#FFFFFF" fillOpacity="0.7" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="6"
            y1="60"
            x2="114"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
      </svg>
      
      {withText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} gradient-text`}>
            Georana<span className="text-brand-accent">AI</span>
          </span>
          {size !== "sm" && (
            <span className="text-xs text-muted-foreground -mt-1">
              Enterprise Edition
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
