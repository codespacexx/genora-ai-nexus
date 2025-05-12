
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

type TextHistoryItem = {
  id: string;
  prompt: string;
  result: string;
  timestamp: string;
};

type ImageHistoryItem = {
  id: string;
  prompt: string;
  image: string; // base64
  timestamp: string;
};

const History = () => {
  const [textHistory, setTextHistory] = useState<TextHistoryItem[]>([]);
  const [imageHistory, setImageHistory] = useState<ImageHistoryItem[]>([]);
  const { isLoggedIn, isLoading, loadUser } = useAuthStore();
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
    // Load history from localStorage
    const loadedTextHistory = localStorage.getItem("genora_text_history");
    const loadedImageHistory = localStorage.getItem("genora_image_history");
    
    if (loadedTextHistory) {
      setTextHistory(JSON.parse(loadedTextHistory));
    }
    
    if (loadedImageHistory) {
      setImageHistory(JSON.parse(loadedImageHistory));
    }
  }, []);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-16 px-4 md:px-8 pb-16 max-w-screen-2xl mx-auto lg:pl-[240px]">
        <div className="pt-8">
          <h1 className="text-3xl font-bold mb-6">Generation History</h1>
          
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="text">Text History</TabsTrigger>
              <TabsTrigger value="image">Image History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-0">
              {textHistory.length > 0 ? (
                <div className="space-y-6">
                  {textHistory.map((item) => (
                    <Card key={item.id} className="card-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Prompt</CardTitle>
                            <p className="text-muted-foreground text-sm">{item.prompt}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-medium mb-2">Result</h4>
                        <div className="p-4 bg-accent/50 rounded-lg whitespace-pre-wrap text-sm">
                          {item.result}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't generated any text yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="image" className="mt-0">
              {imageHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imageHistory.map((item) => (
                    <Card key={item.id} className="card-shadow">
                      <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={`data:image/png;base64,${item.image}`} 
                          alt={item.prompt} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="font-medium text-sm line-clamp-2">{item.prompt}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(item.timestamp)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't generated any images yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default History;
