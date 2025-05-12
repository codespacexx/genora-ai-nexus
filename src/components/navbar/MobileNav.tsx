
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function MobileNavLink({ to, children, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block w-full p-2 text-foreground/80 hover:text-primary hover:bg-accent rounded-md"
    >
      {children}
    </Link>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <button
        className="md:hidden ml-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Button variant="ghost" size="icon" className="bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden p-4 bg-background/80 backdrop-blur-md border-t border-white/10 animate-fade-in absolute left-0 right-0 top-[60px]">
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
    </>
  );
}
