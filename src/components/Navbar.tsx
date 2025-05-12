
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [greeting, setGreeting] = useState("");
  const isMobile = useIsMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const firstName = user?.user_metadata?.name?.split(' ')[0] || 
                   (user?.email ? user.email.split('@')[0] : '');

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left section with logo (mobile) or greeting (desktop) */}
        <div className="flex items-center">
          {/* Only show Logo on mobile when on non-authenticated pages */}
          <div className={!isLoggedIn ? "md:hidden" : "hidden"}>
            <Logo withText />
          </div>
          {/* Add extra space on mobile to account for the sidebar button */}
          {isMobile && isLoggedIn && <div className="w-8" />}
          {isLoggedIn && firstName && (
            <p className="hidden md:block text-lg font-medium ml-2">
              {greeting}, <span className="font-semibold gradient-text">{firstName}</span>
            </p>
          )}
        </div>

        {/* Right section with actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <>
              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="p-4 text-center">
                        <p className="text-sm font-medium">Notifications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You're all caught up! No new notifications.
                        </p>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </>
          )}

          {/* Desktop Navigation - hide on logged in states as the sidebar handles this */}
          {!isLoggedIn && (
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/pricing">Pricing</NavLink>
              <Button asChild className="ml-2">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </nav>
          )}

          {/* Mobile Menu Button - only show on non-authenticated pages */}
          {!isLoggedIn && (
            <button
              className="md:hidden ml-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation - only for non-authenticated pages */}
      {isOpen && !isLoggedIn && (
        <div className="md:hidden p-4 bg-background border-t animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>Pricing</MobileNavLink>
            <Button asChild className="w-full mt-2">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/register">Register</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

// Desktop Nav Link
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-foreground/80 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
  >
    {children}
  </Link>
);

// Mobile Nav Link
const MobileNavLink = ({ 
  to, 
  children,
  onClick
}: { 
  to: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block w-full p-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md"
  >
    {children}
  </Link>
);

// Import Menu from lucide-react at the top of the file
import { Menu } from "lucide-react";
