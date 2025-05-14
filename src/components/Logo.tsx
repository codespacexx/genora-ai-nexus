
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
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="18" 
          cy="18" 
          r="15" 
          fill="url(#paint0_linear)"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <path 
          d="M12,12 A10,10 0 1,0 12,24 L12,18 L18,18"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="3"
            y1="18"
            x2="33"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
      </svg>
      
      {withText && (
        <span className={`${textSizes[size]} gradient-text`}>
          Georana AI
        </span>
      )}
    </Link>
  );
}
