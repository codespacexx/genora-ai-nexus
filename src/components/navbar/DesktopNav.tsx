
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="text-foreground/80 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
    >
      {children}
    </Link>
  );
}

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavLink to="/pricing">Pricing</NavLink>
      <Button asChild className="ml-2">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/register">Register</Link>
      </Button>
    </nav>
  );
}
