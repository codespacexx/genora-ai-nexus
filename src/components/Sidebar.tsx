
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, History, Banknote, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  // Nav items with icons and links
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: History, label: "History", href: "/history" },
    { icon: Banknote, label: "Pricing", href: "/pricing" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsCollapsed(true)} 
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed top-0 left-0 h-full border-r border-border transition-all duration-300 ease-in-out z-40",
          isCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and toggle */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            {!isCollapsed && <Logo size="sm" />}
            <button 
              className="p-1.5 rounded-md hover:bg-accent"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2 p-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors text-sidebar-foreground/80 hover:text-sidebar-foreground"
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
          
          {/* Credits section at bottom */}
          <div className="mt-auto mb-6 px-3">
            {!isCollapsed && (
              <>
                <p className="text-xs text-muted-foreground mb-2">Daily Credits</p>
                <div className="bg-accent/50 rounded-full h-2 mb-5">
                  <div 
                    className="bg-gradient-to-r from-genora-purple to-genora-blue h-full rounded-full" 
                    style={{ width: "60%" }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
      
      {/* Spacer to push content away from sidebar */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "ml-[70px]" : "ml-[240px]",
        isMobile && "ml-0"
      )} />
    </>
  );
}
