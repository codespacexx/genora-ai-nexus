
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";

const Pricing = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthStore();
  const { isPremium } = useCreditsStore();
  
  const handleUpgrade = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    // If already premium, show a message
    if (isPremium) {
      toast.info("You're already on the Premium plan!");
      return;
    }
    
    // Open WhatsApp with pre-filled message
    const userEmail = user?.email || "";
    const whatsappMessage = encodeURIComponent(`Sir I wanna buy premium access. Here is my email: ${userEmail}`);
    window.open(`https://wa.me/8801952081184?text=${whatsappMessage}`, "_blank");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isLoggedIn && <Sidebar />}
      
      <main className={`pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto ${isLoggedIn ? "lg:pl-[240px]" : ""}`}>
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-muted card-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-muted" />
              <CardHeader>
                <CardTitle>Free Plan</CardTitle>
                <CardDescription>For casual users and explorers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem>10 credits per day</PricingItem>
                  <PricingItem>Text & image generation</PricingItem>
                  <PricingItem>History tracking</PricingItem>
                  <PricingItem>Basic quality outputs</PricingItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/register")}
                  disabled={isLoggedIn}
                >
                  {isLoggedIn ? "Current Plan" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-primary card-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Premium Plan</CardTitle>
                    <CardDescription>For creators and professionals</CardDescription>
                  </div>
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem>Unlimited credits</PricingItem>
                  <PricingItem>Priority generation</PricingItem>
                  <PricingItem>Higher quality outputs</PricingItem>
                  <PricingItem>Access to upcoming features</PricingItem>
                  <PricingItem>Custom generations</PricingItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gradient-bg"
                  onClick={handleUpgrade}
                >
                  {isPremium ? "Current Plan" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-xl font-medium mb-4">Need a custom enterprise solution?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us for custom pricing tailored to your organization's needs.
            </p>
            <Button variant="outline" onClick={handleUpgrade}>
              Contact Us
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const PricingItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2">
    <Check className="h-5 w-5 text-primary flex-shrink-0" />
    <span>{children}</span>
  </li>
);

export default Pricing;
