
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, Banknote, Settings, Menu, X, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isPremium } = useCreditsStore();
  const isMobile = useIsMobile();

  // Access user metadata safely
  const userMetadata = user?.user_metadata as Record<string, any> || {};

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 1024 && !isMobile) {
        setIsCollapsed(true);
      }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, [isMobile]);

  // Nav items with icons and links
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: History, label: "History", href: "/history" },
    { icon: Banknote, label: "Pricing", href: "/pricing" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const handleLogout = () => {
    logout();
  };

  // On mobile, use the full drawer width
  const sidebarStyles = isMobile 
    ? "w-full h-full border-0"
    : cn(
        "glass fixed top-0 left-0 h-full border-r border-white/10 transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        "lg:block",
        "hidden" // Hide on mobile when not in drawer
      );

  return (
    <TooltipProvider delayDuration={300}>
      <aside 
        className={sidebarStyles}
        style={{ 
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and toggle */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            {!isCollapsed && <Logo size="sm" />}
            {!isMobile && (
              <button 
                className="p-1.5 rounded-md hover:bg-accent transition-all"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <Menu size={20} /> : <X size={20} />}
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2 p-2 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-all text-sidebar-foreground/80 hover:text-sidebar-foreground group",
                        isActive && "bg-accent text-sidebar-foreground font-medium"
                      )}
                    >
                      <item.icon 
                        size={20} 
                        className="transition-transform duration-200 group-hover:scale-110" 
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && !isMobile && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
          
          {/* User profile at bottom */}
          <div className="mt-auto mb-4 px-2">
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-md border border-white/10",
              isCollapsed && !isMobile ? "flex-col" : "flex-row"
            )}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={userMetadata?.avatar_url || ""} />
                <AvatarFallback className="bg-primary/10">
                  {getInitials(userMetadata?.name || user?.email)}
                </AvatarFallback>
              </Avatar>
              
              {!isCollapsed && (
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium truncate">
                    {userMetadata?.name || user?.email || "User"}
                  </span>
                  <span className={cn(
                    "text-xs truncate",
                    isPremium ? "text-genora-purple" : "text-muted-foreground"
                  )}>
                    {isPremium ? "Premium Plan" : "Free Plan"}
                  </span>
                </div>
              )}
              
              {!isCollapsed && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Logout
                  </TooltipContent>
                </Tooltip>
              )}
              
              {isCollapsed && !isMobile && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Logout
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Spacer to push content away from sidebar - only on desktop */}
      {!isMobile && (
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-[70px]" : "ml-[240px]",
          "hidden lg:block" // Only show on large screens
        )} />
      )}
    </TooltipProvider>
  );
}
