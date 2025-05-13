
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
  Zap, 
  Clock, 
  ImageIcon, 
  FileText, 
  Code,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import CreditsDisplay from "@/components/CreditsDisplay";
import UsageStats from "@/components/UsageStats";
import QuickTips from "@/components/QuickTips";
import TextGenerator from "@/components/TextGenerator";
import ImageGenerator from "@/components/ImageGenerator";

// Sample usage data for chart
const usageData = [
  { name: "Mon", text: 24, image: 5, code: 12 },
  { name: "Tue", text: 30, image: 8, code: 18 },
  { name: "Wed", text: 15, image: 3, code: 10 },
  { name: "Thu", text: 40, image: 12, code: 15 },
  { name: "Fri", text: 28, image: 6, code: 14 },
  { name: "Sat", text: 12, image: 2, code: 8 },
  { name: "Sun", text: 5, image: 1, code: 4 }
];

// Recent AI generations
const recentGenerations = [
  {
    id: 1,
    title: "Marketing Email Draft",
    type: "text",
    timestamp: "2 hours ago",
    previewText: "Introducing our new premium subscription with advanced AI features..."
  },
  {
    id: 2,
    title: "Product Banner Image",
    type: "image",
    timestamp: "4 hours ago",
    imageUrl: "https://placehold.co/300x200/3b82f6/FFFFFF"
  },
  {
    id: 3,
    title: "React Component",
    type: "code",
    timestamp: "Yesterday",
    previewText: "function Button({ children, onClick }) {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n}"
  },
  {
    id: 4,
    title: "Customer Support Chatbot",
    type: "chat",
    timestamp: "Yesterday",
    previewText: "Here are some common FAQs about our product that might help resolve your issue..."
  }
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
  
  // Function to render appropriate icon based on generation type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "text":
        return <FileText className="w-4 h-4 text-green-500" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case "code":
        return <Code className="w-4 h-4 text-purple-500" />;
      case "chat":
        return <MessageSquare className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-6 px-4 md:px-6 pb-16 max-w-screen-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back<span className="hidden sm:inline">, {user?.user_metadata?.name || user?.email?.split('@')[0] || "User"}</span></h1>
          <p className="text-muted-foreground">Here's an overview of your AI assistant activity</p>
        </div>
        
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
          {/* Left column - Large section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Usage chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Usage Analytics</CardTitle>
                <CardDescription>Your AI generation activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="text" name="Text" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="image" name="Images" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="code" name="Code" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Tools */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="mb-6 bg-background border">
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
          
          {/* Right column - Sidebars */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <QuickTips />
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Generations</CardTitle>
                  <Clock className="text-muted-foreground w-4 h-4" />
                </div>
                <CardDescription>Your latest AI-generated content</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-1">
                  {recentGenerations.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{item.title}</h4>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">{item.timestamp}</span>
                        </div>
                        {item.type === "image" ? (
                          <div className="mt-2 rounded-md overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {item.previewText}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Suggested Tools */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Suggested Tools</CardTitle>
                  <Lightbulb className="text-muted-foreground w-4 h-4" />
                </div>
                <CardDescription>Try these premium features</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-2">
                  {[
                    { name: "Code Helper", description: "Get AI assistance with coding", icon: Code, path: "/code-helper" },
                    { name: "ChatBot", description: "Customizable AI assistant", icon: MessageSquare, path: "/chatbot" }
                  ].map((tool, i) => (
                    <a 
                      key={i}
                      href={tool.path}
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 group transition-colors"
                    >
                      <div className="p-2 rounded-md bg-brand-accent/10 text-brand-accent">
                        <tool.icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{tool.name}</h4>
                          <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </div>
                    </a>
                  ))}
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
