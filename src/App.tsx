
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useCreditsStore } from "./store/creditsStore";
import { NavBar } from "./components/navbar/NavBar";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./index.css";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.documentElement.classList.add(storedTheme);
  } else {
    // Check system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    document.documentElement.classList.add(systemPreference);
  }
};

const App = () => {
  const { isLoggedIn, isLoading, loadUser, user } = useAuthStore();
  const { checkAndResetCredits, setPremium } = useCreditsStore();
  
  // Initialize theme and load user data on app start
  useEffect(() => {
    initializeTheme();
    loadUser();
    checkAndResetCredits();
  }, [loadUser, checkAndResetCredits]);
  
  // Sync premium status from user to credits store
  useEffect(() => {
    if (user?.isPremium) {
      setPremium(true);
    }
  }, [user, setPremium]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar /> {/* NavBar component now handles conditional rendering internally */}
          <div className={isLoggedIn ? "pt-[72px] min-h-screen" : "min-h-screen"}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/image-generator" element={<Dashboard />} />
              <Route path="/text-generator" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
