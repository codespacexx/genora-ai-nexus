
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function UserGreeting() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  
  const firstName = user?.user_metadata?.name?.split(' ')[0] || 
                   (user?.email ? user.email.split('@')[0] : '');
  
  if (!firstName) return null;
  
  return (
    <p className="hidden md:block text-lg font-medium ml-2">
      {greeting}, <span className="font-semibold gradient-text">{firstName}</span>
    </p>
  );
}
