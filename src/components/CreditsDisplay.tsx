
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  
  return (
    <div className="border rounded-xl p-4 card-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Daily Credits</h3>
        <span className={`text-sm ${isPremium ? 'text-genora-purple' : 'text-muted-foreground'}`}>
          {isPremium ? 'Premium' : 'Free'}
        </span>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <Progress value={percentage} className="h-2" />
        <span className="text-sm font-medium min-w-[45px] text-right">
          {credits}/{maxCredits}
        </span>
      </div>
      
      {credits === 0 && !isPremium && (
        <div className="mt-3 text-sm text-center">
          <p className="text-destructive mb-2">
            You've hit the daily limit!
          </p>
          <Button asChild size="sm" className="w-full">
            <Link to="/pricing">Upgrade now</Link>
          </Button>
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
