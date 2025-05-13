
import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeonFluxLogo } from "@/components/logo/NeonFluxLogo";
import { NeonfluxDrawer } from "@/components/navbar/NeonfluxDrawer";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

export function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useAuthStore();
  
  // Access user metadata safely
  const userMetadata = user?.user_metadata as Record<string, any> || {};

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 professional-glass shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side with logo */}
          <div className="flex items-center">
            <Link to="/dashboard">
              <NeonFluxLogo />
            </Link>
          </div>

          {/* Right side with actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-background/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 hover:bg-background/40"
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-background/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 hover:bg-background/40 rounded-full overflow-hidden"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userMetadata?.avatar_url || ""} />
                    <AvatarFallback className="bg-brand-accent/10 text-brand-accent">
                      {userMetadata?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/billing">Subscription</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => logout()}
                  className="text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Hamburger menu */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              className="bg-background/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 hover:bg-background/40"
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
