
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import CreditsDisplay from "@/components/CreditsDisplay";
import UsageStats from "@/components/UsageStats";
import QuickTips from "@/components/QuickTips";
import TextGenerator from "@/components/TextGenerator";
import ImageGenerator from "@/components/ImageGenerator";

const Dashboard = () => {
  const { isLoggedIn, isLoading, loadUser, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("text");
  
  // Determine active tab based on URL
  useEffect(() => {
    if (location.pathname === "/image-generator") {
      setActiveTab("image");
    } else if (location.pathname === "/text-generator") {
      setActiveTab("text");
    }
  }, [location.pathname]);
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(value === "text" ? "/text-generator" : "/image-generator");
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto">
        <div className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Widget Cards - First Row */}
            <div className="lg:col-span-2">
              <CreditsDisplay />
            </div>
            <div className="lg:col-span-2">
              <UsageStats />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - Tools */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="text">Text Generation</TabsTrigger>
                  <TabsTrigger value="image">Image Generation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="mt-0">
                  <TextGenerator />
                </TabsContent>
                
                <TabsContent value="image" className="mt-0">
                  <ImageGenerator />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Tips */}
            <div className="space-y-6">
              <QuickTips />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
