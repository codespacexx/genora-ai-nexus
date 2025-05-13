
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeonFluxLogo } from "@/components/logo/NeonFluxLogo";
import { NeonfluxDrawer } from "@/components/navbar/NeonfluxDrawer";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";

export function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 professional-glass shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side with logo */}
          <div className="flex items-center">
            <NeonFluxLogo />
          </div>

          {/* Right side with actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Hamburger menu */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              className="bg-background/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/30 hover:bg-background/80"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Drawer for sidebar */}
      <NeonfluxDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}
