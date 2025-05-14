
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { 
  ArrowUpRight, 
  Zap
} from "lucide-react";
import CreditsDisplay from "@/components/CreditsDisplay";
import UsageStats from "@/components/UsageStats";
import QuickTips from "@/components/QuickTips";
import TextGenerator from "@/components/TextGenerator";
import ImageGenerator from "@/components/ImageGenerator";

// Sample usage data for chart
const usageData = [
  { name: "Mon", text: 24, image: 5 },
  { name: "Tue", text: 30, image: 8 },
  { name: "Wed", text: 15, image: 3 },
  { name: "Thu", text: 40, image: 12 },
  { name: "Fri", text: 28, image: 6 },
  { name: "Sat", text: 12, image: 2 },
  { name: "Sun", text: 5, image: 1 }
];

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-6 px-4 md:px-6 pb-16 max-w-screen-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient">
            Welcome back
            <span className="hidden sm:inline">, {user?.user_metadata?.name || user?.email?.split('@')[0] || "User"}</span>
          </h1>
          <p className="text-muted-foreground">Get a quick overview of your AI assistant activity</p>
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2">
            <CreditsDisplay />
          </div>
          <div className="lg:col-span-2">
            <UsageStats />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Compact Analytics Chart */}
            <Card className="overflow-hidden border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-0">
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Weekly Usage</CardTitle>
                    <CardDescription>Your AI generation activity over time</CardDescription>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                    Last 7 days
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData}
                      margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          background: 'rgba(23, 23, 23, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="text" 
                        name="Text" 
                        fill="rgba(59, 130, 246, 0.8)" 
                        radius={[4, 4, 0, 0]} 
                        activeBar={{fill: "rgba(59, 130, 246, 1)"}}
                      />
                      <Bar 
                        dataKey="image" 
                        name="Images" 
                        fill="rgba(139, 92, 246, 0.8)" 
                        radius={[4, 4, 0, 0]} 
                        activeBar={{fill: "rgba(139, 92, 246, 1)"}}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Tools */}
            <Card className="overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-semibold">AI Assistant Tools</CardTitle>
                <CardDescription>Generate content with our AI assistants</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6 bg-background/50 border">
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
              </CardContent>
            </Card>
          </div>
          
          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Quick Tips Card - Kept and styled */}
            <QuickTips />
            
            {/* Additional Stats or Info Card */}
            <Card className="overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Pro Tips</CardTitle>
                  <Zap className="text-brand-accent w-4 h-4" />
                </div>
                <CardDescription>Get the most out of Georana AI</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Use clear prompts</h4>
                    <p className="text-xs text-muted-foreground">Specific instructions yield better results from the AI.</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Iterate your results</h4>
                    <p className="text-xs text-muted-foreground">Don't settle for the first generation—refine and regenerate.</p>
                  </div>
                  <a 
                    href="#" 
                    className="flex items-center gap-1 text-xs text-brand-accent hover:underline mt-2"
                  >
                    View all tips
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
