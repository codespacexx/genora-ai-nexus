
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export default function Logo({ size = "md", withText = true }: LogoProps) {
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
      className="flex items-center gap-2.5 font-bold"
    >
      <svg 
        className={`${sizes[size]}`}
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3Z"
          fill="url(#paint0_linear)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33ZM15.5 13C14.1193 13 13 14.1193 13 15.5V22.5C13 23.8807 14.1193 25 15.5 25H20.5C21.8807 25 23 23.8807 23 22.5V15.5C23 14.1193 21.8807 13 20.5 13H15.5ZM18 18.5C18 18.5 18 14.5 18 14.5C18 14.5 20.5 14.5 20.5 14.5C20.5 14.5 20.5 22.5 20.5 22.5C20.5 22.5 15.5 22.5 15.5 22.5C15.5 22.5 15.5 18.5 15.5 18.5C15.5 18.5 18 18.5 18 18.5Z"
          fill="white"
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
          Genora AI
        </span>
      )}
    </Link>
  );
}
