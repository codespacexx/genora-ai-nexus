
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Drawer,
  DrawerContent,
  DrawerOverlay
} from "@/components/ui/drawer";
import { 
  LayoutDashboard, 
  Image, 
  Text, 
  History, 
  DollarSign, 
  Settings, 
  LogOut,
  Code,
  MessageSquare
} from "lucide-react";
import { NeonFluxLogo } from "@/components/logo/NeonFluxLogo";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

interface NeonfluxDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NeonfluxDrawer({ open, onOpenChange }: NeonfluxDrawerProps) {
  const location = useLocation();
  const { logout } = useAuthStore();
  
  // Close drawer when route changes (mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      onOpenChange(false);
    }
  }, [location.pathname, onOpenChange]);

  // Navigation items
  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: "/dashboard" 
    },
    { 
      icon: Text, 
      label: "Content Generator", 
      href: "/text-generator" 
    },
    { 
      icon: Image, 
      label: "Image Generator", 
      href: "/image-generator" 
    },
    { 
      icon: Code, 
      label: "Code Helper", 
      href: "/code-helper" 
    },
    { 
      icon: MessageSquare, 
      label: "ChatBot", 
      href: "/chatbot" 
    },
    { 
      icon: History, 
      label: "History", 
      href: "/history" 
    },
    { 
      icon: DollarSign, 
      label: "Pricing", 
      href: "/pricing" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      href: "/settings" 
    }
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerOverlay className="bg-black/40 backdrop-blur-sm" />
      <DrawerContent className="w-72 p-0 professional-glass border-r border-gray-200/50 dark:border-gray-700/30">
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="flex items-center p-4 border-b border-gray-200/50 dark:border-gray-700/30">
            <NeonFluxLogo size="sm" />
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all",
                        "hover:bg-brand-accent/10 group",
                        isActive 
                          ? "bg-brand-accent/15 text-brand-accent font-medium" 
                          : "text-foreground/80"
                      )}
                    >
                      <item.icon 
                        size={18} 
                        className={cn(
                          "transition-all duration-300",
                          isActive 
                            ? "text-brand-accent" 
                            : "text-foreground/70 group-hover:text-brand-accent"
                        )}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                      
                      {isActive && (
                        <div className="ml-auto w-1 h-5 bg-brand-accent rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
              
              {/* Logout button */}
              <li className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 rounded-md transition-all hover:bg-brand-accent/10 text-foreground/80 group"
                >
                  <LogOut 
                    size={18} 
                    className="text-foreground/70 group-hover:text-brand-accent transition-colors" 
                  />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/30">
            <div className="text-xs text-center text-foreground/60">
              <p>NeonFlux AI © 2025</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
