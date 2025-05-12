
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const { user, isLoggedIn, isLoading, loadUser, updateUser } = useAuthStore();
  const { isPremium } = useCreditsStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simple validation
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      setIsSaving(false);
      return;
    }
    
    setTimeout(() => {
      updateUser({ name, email });
      toast.success("Profile updated successfully");
      setIsSaving(false);
    }, 500);
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
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            {/* Profile Settings */}
            <TabsContent value="profile" className="mt-0">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSaveProfile}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSaving}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            {/* Account Settings */}
            <TabsContent value="account" className="mt-0">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Billing Settings */}
            <TabsContent value="billing" className="mt-0">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Current Plan</h3>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          isPremium ? 
                          "bg-primary/10 text-primary" : 
                          "bg-muted text-muted-foreground"
                        }`}>
                          {isPremium ? "Premium" : "Free"}
                        </span>
                        {isPremium && (
                          <span className="text-sm text-muted-foreground">
                            Renews on June 15, 2025
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {isPremium ? (
                      <div className="space-y-4">
                        <div className="border-t pt-4">
                          <h3 className="font-semibold mb-2">Payment Method</h3>
                          <div className="flex items-center gap-3">
                            <div className="bg-muted w-12 h-8 rounded flex items-center justify-center">
                              <span className="font-bold">VISA</span>
                            </div>
                            <span>••••  ••••  ••••  4242</span>
                            <span className="text-sm text-muted-foreground">Expires 06/25</span>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold mb-2">Billing History</h3>
                          <div className="text-sm">
                            <p>No billing history available.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upgrade to our Premium plan to get unlimited credits and premium features.
                        </p>
                        <Button
                          className="gradient-bg text-white"
                          onClick={() => navigate("/pricing")}
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Button 
              variant="destructive" 
              className="opacity-80 hover:opacity-100"
              onClick={() => toast.info("This feature is not available yet")}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
