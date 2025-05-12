
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/store/authStore";
import Logo from "./Logo";
import { ThemeToggle } from "./navbar/ThemeToggle";
import { NotificationButton } from "./navbar/NotificationButton";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileNav } from "./navbar/MobileNav";
import { UserGreeting } from "./navbar/UserGreeting";
import { GlassySidebar } from "./navbar/GlassySidebar";

export default function Navbar() {
  const { isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Professional glassy navbar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-background/30 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left section with logo or greeting */}
          <div className="flex items-center">
            {/* Only show Logo when not logged in */}
            <div className={!isLoggedIn ? "md:hidden" : "hidden"}>
              <Logo withText />
            </div>
            
            {/* Add space for sidebar button */}
            {isMobile && isLoggedIn && <div className="w-8" />}
            
            {/* Show greeting when logged in */}
            {isLoggedIn && <UserGreeting />}
          </div>

          {/* Right section with actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                <ThemeToggle />
                <NotificationButton />
              </>
            )}

            {/* Navigation - only show when not logged in */}
            {!isLoggedIn && (
              <>
                <DesktopNav />
                <MobileNav />
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Glassy sidebar - only show when logged in */}
      {isLoggedIn && <GlassySidebar />}
    </>
  );
}
