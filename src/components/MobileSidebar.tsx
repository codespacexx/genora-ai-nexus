
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerOverlay, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close drawer when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  if (!isMobile) {
    return <Sidebar />;
  }
  
  return (
    <>
      {/* Mobile Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-3 left-3 z-40 md:hidden rounded-full"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </Button>
        </DrawerTrigger>
        <DrawerOverlay className="bg-black/50 backdrop-blur-sm" />
        <DrawerContent
          className="w-[240px] max-w-[80vw] h-full top-0 left-0 rounded-none"
        >
          <div className="h-full">
            <Sidebar />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
