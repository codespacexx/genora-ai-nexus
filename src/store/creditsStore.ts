
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CreditsState {
  credits: number;
  maxCredits: number;
  lastReset: string | null;
  isPremium: boolean;
  useCredits: (amount?: number) => boolean;
  resetCredits: () => void;
  checkAndResetCredits: () => void;
  setPremium: (isPremium: boolean) => void;
}

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set, get) => ({
      credits: 10,
      maxCredits: 10,
      lastReset: null,
      isPremium: false,
      
      useCredits: (amount = 1) => {
        const { credits, isPremium } = get();
        
        // Premium users don't use credits
        if (isPremium) return true;
        
        // Check if enough credits
        if (credits < amount) return false;
        
        // Use credits
        set({ credits: credits - amount });
        return true;
      },
      
      resetCredits: () => {
        set({ 
          credits: get().isPremium ? 100 : 10,
          maxCredits: get().isPremium ? 100 : 10,
          lastReset: new Date().toISOString()
        });
      },
      
      checkAndResetCredits: () => {
        const { lastReset, isPremium } = get();
        
        // If no last reset, initialize
        if (!lastReset) {
          set({ 
            lastReset: new Date().toISOString(),
            credits: isPremium ? 100 : 10,
            maxCredits: isPremium ? 100 : 10
          });
          return;
        }
        
        // Check if 24 hours have passed
        const lastResetDate = new Date(lastReset);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff >= 24) {
          get().resetCredits();
        }
      },
      
      setPremium: (isPremium) => {
        set({ 
          isPremium,
          maxCredits: isPremium ? 100 : 10 
        });
        get().resetCredits();
      }
    }),
    {
      name: "genora-credits"
    }
  )
);
