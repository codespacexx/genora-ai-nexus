
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Logo withText />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/history">History</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="ml-4"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/pricing">Pricing</NavLink>
              <Button asChild className="ml-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden p-4 bg-background border-t animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {isLoggedIn ? (
              <>
                <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                <MobileNavLink to="/history" onClick={() => setIsOpen(false)}>History</MobileNavLink>
                <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>Pricing</MobileNavLink>
                <MobileNavLink to="/settings" onClick={() => setIsOpen(false)}>Settings</MobileNavLink>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full mt-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>Pricing</MobileNavLink>
                <Button asChild className="w-full mt-2">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
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
