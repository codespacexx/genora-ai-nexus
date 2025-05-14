
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { isPremiumApproved } from "@/services/premiumVerification";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Billing = () => {
  const { user, isLoggedIn, isLoading, updateUser } = useAuthStore();
  const { isPremium, setPremium } = useCreditsStore();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  const handleActivatePremium = async () => {
    if (!user?.email) {
      toast.error("User email not available. Please update your profile.");
      return;
    }
    
    setCheckingStatus(true);
    setVerificationMessage("Checking your subscription status...");
    
    try {
      const isApproved = await isPremiumApproved(user.email);
      
      if (isApproved) {
        // Update both local state and the user object
        setPremium(true);
        updateUser({ isPremium: true });
        toast.success("Premium subscription activated!");
        setVerificationMessage(null);
      } else {
        toast.error("Your email is not on the approved premium list.");
        setVerificationMessage("Your email is not on our approved premium list. Please contact support.");
      }
    } catch (error) {
      toast.error("Failed to verify premium status. Please try again.");
      setVerificationMessage(null);
    } finally {
      setCheckingStatus(false);
    }
  };
  
  const handleDeactivatePremium = () => {
    setPremium(false);
    updateUser({ isPremium: false });
    toast.info("Premium subscription deactivated");
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto lg:pl-[240px]">
        <div className="pt-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>
          
          <Card className="card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subscription Status</CardTitle>
                  <CardDescription>
                    Manage your Georana AI subscription
                  </CardDescription>
                </div>
                <Badge variant={isPremium ? "default" : "outline"} className={isPremium ? "bg-primary/80" : ""}>
                  {isPremium ? "Premium" : "Free"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isPremium ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-medium text-primary mb-2">Premium Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>100 credits per day</li>
                      <li>Priority processing</li>
                      <li>Advanced export options</li>
                      <li>Early access to new features</li>
                      <li>Premium support</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your premium subscription is active. You have access to all premium features.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-accent/30 rounded-lg">
                    <h3 className="font-medium mb-2">Upgrade to Premium</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Unlock all premium features and get 100 credits per day.
                    </p>
                    
                    {verificationMessage && (
                      <Alert className="mb-4">
                        <AlertDescription>{verificationMessage}</AlertDescription>
                      </Alert>
                    )}
                    
                    <p className="text-sm mb-3">
                      Enter your email below to verify your premium subscription.
                    </p>
                    
                    <div className="text-sm mb-2">
                      <strong>Email:</strong> {user?.email || "No email found"}
                    </div>
                    
                    <Button 
                      className="gradient-bg w-full mt-2"
                      disabled={checkingStatus || !user?.email}
                      onClick={handleActivatePremium}
                    >
                      {checkingStatus ? "Verifying..." : "Verify Premium Status"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {isPremium && (
                <Button 
                  variant="outline" 
                  onClick={handleDeactivatePremium}
                  className="text-destructive hover:text-destructive"
                >
                  Deactivate Premium
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className="card-shadow mt-6">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View your payment history and receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                No payment history available.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billing;
