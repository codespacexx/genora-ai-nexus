
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Plus, Settings } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";

// Chat message interface
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const { user } = useAuthStore();
  // Access user metadata safely
  const userMetadata = user?.user_metadata as Record<string, any> || {};
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState("helpful");
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      const personalityResponses = {
        helpful: "I'd be happy to help with that! Let me provide some useful information...",
        creative: "Oh, what an interesting question! Let's explore some creative possibilities...",
        professional: "Thank you for your inquiry. Based on standard practices in the field...",
        friendly: "Hey there! Great question! I think the best approach would be..."
      };
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: personalityResponses[personality as keyof typeof personalityResponses],
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    toast.success("Chat history cleared");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-brand-accent/10">
            <MessageSquare size={24} className="text-brand-accent" />
          </div>
          <h1 className="text-3xl font-bold">AI Chatbot</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Button className="w-full gap-2 justify-start" variant="outline">
              <Plus size={16} />
              New Chat
            </Button>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Assistant Settings</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Personality</label>
                    <Select 
                      value={personality} 
                      onValueChange={setPersonality}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="helpful">Helpful</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3">
                <Button variant="ghost" className="w-full gap-2 justify-start" size="sm">
                  <Settings size={14} />
                  Advanced Options
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Recent Chats</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="space-y-2">
                  {["Project brainstorming", "Technical support", "Product questions"].map((chat, i) => (
                    <div 
                      key={i} 
                      className="p-2 rounded-md hover:bg-accent cursor-pointer text-sm"
                    >
                      {chat}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat area */}
          <div className="lg:col-span-3">
            <Card className="flex flex-col h-[calc(100vh-230px)]">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Chat Session</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearChat}>
                    Clear chat
                  </Button>
                </div>
                <CardDescription>
                  Currently using <span className="font-medium capitalize">{personality}</span> personality
                </CardDescription>
              </CardHeader>
              
              {/* Messages container */}
              <CardContent className="flex-grow overflow-y-auto mb-4 px-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-brand-accent text-white">AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[75%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} p-3 rounded-xl`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={userMetadata?.avatar_url || ""} />
                          <AvatarFallback className="bg-brand-dark">
                            {userMetadata?.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              {/* Input area */}
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
