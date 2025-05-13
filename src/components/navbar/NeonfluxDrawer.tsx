
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
  LogOut 
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
      icon: Image, 
      label: "Image Generator", 
      href: "/image-generator" 
    },
    { 
      icon: Text, 
      label: "Text Generator", 
      href: "/text-generator" 
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
      <DrawerOverlay className="bg-black/60 backdrop-blur-sm" />
      <DrawerContent className="w-72 p-0 neonflux-glass border-r border-neonflux-purple/20">
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="flex items-center p-4 border-b border-neonflux-purple/20">
            <NeonFluxLogo size="sm" />
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        "hover:bg-neonflux-purple/10 group",
                        isActive 
                          ? "bg-neonflux-purple/20 text-neonflux-purple font-orbitron" 
                          : "text-foreground/80"
                      )}
                    >
                      <item.icon 
                        size={20} 
                        className={cn(
                          "transition-all duration-300",
                          isActive 
                            ? "text-neonflux-purple" 
                            : "text-foreground/70 group-hover:text-neonflux-purple"
                        )}
                      />
                      <span className="font-medium">{item.label}</span>
                      
                      {isActive && (
                        <div className="ml-auto w-1.5 h-6 bg-neonflux-purple rounded-full animate-pulse-slow" />
                      )}
                    </Link>
                  </li>
                );
              })}
              
              {/* Logout button */}
              <li className="mt-6">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-neonflux-purple/10 text-foreground/80 group"
                >
                  <LogOut 
                    size={20} 
                    className="text-foreground/70 group-hover:text-neonflux-purple transition-colors" 
                  />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-neonflux-purple/20">
            <div className="text-xs text-center text-foreground/60">
              <p>NeonFlux AI © 2025</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
