
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Billing = () => {
  const { isLoggedIn, isLoading, loadUser, user } = useAuthStore();
  const { isPremium } = useCreditsStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Get next billing date (fake, for demonstration)
  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto lg:pl-[240px]">
        <div className="pt-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Billing</h1>
          
          <Card className="card-shadow mb-8">
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Your current plan and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isPremium ? "Premium Plan" : "Free Plan"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isPremium ? 
                        "Unlimited credits with premium features" : 
                        "10 credits per day with basic features"}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      isPremium ? 
                      "bg-primary/10 text-primary" : 
                      "bg-muted text-muted-foreground"
                    }`}>
                      {isPremium ? "Active" : "Free Tier"}
                    </span>
                  </div>
                </div>
                
                {isPremium ? (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <h4 className="font-medium mb-1">Billing Cycle</h4>
                      <p className="text-muted-foreground">
                        Monthly - Next payment on {getNextBillingDate()}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Payment Method</h4>
                      <div className="flex items-center gap-3">
                        <div className="bg-muted w-12 h-8 rounded flex items-center justify-center">
                          <span className="font-bold">VISA</span>
                        </div>
                        <span>••••  4242</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                      <Button variant="outline" size="sm">Update Payment</Button>
                      <Button variant="outline" size="sm">Cancel Subscription</Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <p className="mb-4">
                      Upgrade to Premium for unlimited credits and access to all premium features.
                    </p>
                    <Button asChild className="gradient-bg">
                      <Link to="/pricing">Upgrade to Premium</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Your recent invoices and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPremium ? (
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-muted-foreground">May 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                      <p className="text-xs text-green-600">Paid</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-muted-foreground">April 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                      <p className="text-xs text-green-600">Paid</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No billing history available for free plan.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billing;
