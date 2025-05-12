
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CreditsDisplay from "@/components/CreditsDisplay";
import TextGenerator from "@/components/TextGenerator";
import ImageGenerator from "@/components/ImageGenerator";

const Dashboard = () => {
  const { isLoggedIn, isLoading, loadUser } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto lg:pl-[240px]">
        <div className="pt-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - Tools */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="text" className="w-full">
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
            
            {/* Right column - Credits and Info */}
            <div className="space-y-6">
              <CreditsDisplay />
              
              <div className="border rounded-xl p-4 card-shadow">
                <h3 className="font-semibold mb-3">Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Be specific with your prompts for better results</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Image generation uses 2 credits per image</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>View your generation history in the History tab</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
