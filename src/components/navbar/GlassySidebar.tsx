
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  History, 
  Banknote, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export function GlassySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isPremium } = useCreditsStore();
  
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

  // User metadata
  const userMetadata = user?.user_metadata as Record<string, any> || {};

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed left-0 top-0 h-screen z-30 flex">
        {/* Hidden sidebar that expands */}
        <aside 
          className={cn(
            "h-full transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[60px]" : "w-[240px]",
            "bg-background/30 backdrop-blur-md border-r border-white/10"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo and toggle */}
            <div className="flex items-center justify-between h-16 px-3 border-b border-white/5">
              <div className={cn("overflow-hidden transition-all", isCollapsed ? "w-0" : "w-full")}>
                {!isCollapsed && <Logo size="sm" />}
              </div>
              <button 
                className={cn(
                  "p-1.5 rounded-full flex items-center justify-center",
                  "hover:bg-white/10 transition-all",
                  isCollapsed ? "ml-0.5" : "mr-0.5"
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? 
                  <ChevronRight size={18} className="text-foreground/70" /> : 
                  <ChevronLeft size={18} className="text-foreground/70" />
                }
              </button>
            </div>
            
            <ScrollArea className="flex-1 pt-4">
              <nav className="flex flex-col gap-1 px-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
                            "hover:bg-white/10 group",
                            isActive ? "bg-white/10 text-foreground" : "text-foreground/70"
                          )}
                        >
                          <item.icon 
                            size={20} 
                            className="transition-transform duration-200 group-hover:scale-110" 
                          />
                          <span className={cn(
                            "whitespace-nowrap transition-all",
                            isCollapsed ? "opacity-0 w-0" : "opacity-100"
                          )}>
                            {item.label}
                          </span>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </ScrollArea>
            
            {/* User profile */}
            <div className="mt-auto p-2">
              <div className={cn(
                "flex items-center gap-3 p-2 rounded-md border border-white/5",
                "hover:bg-white/5 transition-colors",
                isCollapsed ? "justify-center" : "justify-between"
              )}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={userMetadata?.avatar_url || ""} />
                  <AvatarFallback className="bg-primary/10">
                    {getInitials(userMetadata?.name || user?.email)}
                  </AvatarFallback>
                </Avatar>
                
                {!isCollapsed && (
                  <>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-medium text-sm truncate">
                        {userMetadata?.name || user?.email || "User"}
                      </span>
                      <span className={cn(
                        "text-xs truncate",
                        isPremium ? "text-primary" : "text-muted-foreground"
                      )}>
                        {isPremium ? "Premium Plan" : "Free Plan"}
                      </span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={logout}
                    >
                      <LogOut size={16} />
                    </Button>
                  </>
                )}
                
                {isCollapsed && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hidden"
                      >
                        <LogOut size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Profile
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </aside>
        
        {/* Clickable area to expand sidebar when collapsed */}
        {isCollapsed && (
          <div 
            className="h-full w-1 cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => setIsCollapsed(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
