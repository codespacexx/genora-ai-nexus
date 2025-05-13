
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NeonFluxLogo } from "@/components/logo/NeonFluxLogo";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <NeonFluxLogo size="lg" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-brand-accent">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link to="/">
              <Home size={18} />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link to="/dashboard">
              <ArrowLeft size={18} />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
