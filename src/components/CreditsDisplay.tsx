
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreditsStore } from "@/store/creditsStore";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

export default function CreditsDisplay() {
  const { credits, maxCredits, isPremium, checkAndResetCredits } = useCreditsStore();
  const { user } = useAuthStore();
  
  // Check if credits need resetting when component mounts
  useEffect(() => {
    checkAndResetCredits();
    
    // Also check every hour
    const interval = setInterval(() => {
      checkAndResetCredits();
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkAndResetCredits]);
  
  // Calculate percentage
  const percentage = Math.round((credits / maxCredits) * 100);
  const strokeWidth = 10;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="border rounded-xl p-5 card-shadow backdrop-blur-sm bg-card/60">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Daily Credits</h3>
        <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isPremium ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {isPremium ? 'Premium' : 'Free'}
        </span>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="relative flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            {/* Foreground circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <span className="block text-2xl font-bold">{credits}</span>
            <span className="text-xs text-muted-foreground">/{maxCredits}</span>
          </div>
        </div>
      </div>
      
      {credits === 0 && !isPremium && (
        <div className="mt-3 text-sm text-center">
          <p className="text-destructive mb-2">
            You've hit the daily limit!
          </p>
          <Button asChild size="sm" className="w-full gradient-bg">
            <Link to="/pricing">Upgrade now</Link>
          </Button>
        </div>
      )}
      
      {isPremium && (
        <div className="mt-3 text-sm text-center">
          <p className="text-primary">
            Premium activated! Enjoy your enhanced features.
          </p>
        </div>
      )}
      
      {!isPremium && credits > 0 && credits <= 3 && (
        <div className="mt-2">
          <p className="text-xs text-amber-500">
            Running low on credits. Credits reset in 24 hours.
          </p>
        </div>
      )}
    </div>
  );
}
