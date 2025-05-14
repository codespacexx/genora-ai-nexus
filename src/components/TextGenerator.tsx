
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateText } from "@/services/api";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import { Copy, LucideLoader2, MessageSquare, Book } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/ui/input";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState("professional");
  const [style, setStyle] = useState("concise");
  const [contentType, setContentType] = useState("general");
  const [wordCount, setWordCount] = useState("500");
  const [seoKeywords, setSeoKeywords] = useState("");
  const { useCredits, credits, isPremium } = useCreditsStore();
  const { user } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt");
      return;
    }
    
    // Check if user has credits
    if (!useCredits(1)) {
      toast.error("You've run out of credits. Upgrade to premium or wait for your daily reset.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Enhanced prompt with additional parameters if premium
      let enhancedPrompt = `${prompt}\n\nTone: ${tone}\nStyle: ${style}`;
      
      if (isPremium) {
        enhancedPrompt += `\nContent Type: ${contentType}`;
        enhancedPrompt += `\nTarget Word Count: ${wordCount}`;
        
        if (seoKeywords.trim()) {
          enhancedPrompt += `\nSEO Keywords: ${seoKeywords}`;
        }
      }
      
      const generatedText = await generateText(enhancedPrompt);
      setResult(generatedText);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("genora_text_history") || "[]");
      history.unshift({
        id: crypto.randomUUID(),
        prompt,
        result: generatedText,
        timestamp: new Date().toISOString(),
        tone,
        style,
        contentType: isPremium ? contentType : undefined,
        wordCount: isPremium ? wordCount : undefined,
        seoKeywords: isPremium && seoKeywords ? seoKeywords : undefined
      });
      localStorage.setItem("genora_text_history", JSON.stringify(history.slice(0, 50)));
    } catch (error) {
      console.error("Failed to generate text:", error);
      toast.error("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };
  
  // Select options
  const contentTypes = [
    { value: "general", label: "General" },
    { value: "blog", label: "Blog Post" },
    { value: "article", label: "Article" },
    { value: "email", label: "Email" },
    { value: "social", label: "Social Media" },
    { value: "ad", label: "Advertisement" },
    { value: "product", label: "Product Description" },
    { value: "seo", label: "SEO Content" },
    { value: "summary", label: "Summary" },
    { value: "creative", label: "Creative Writing" }
  ];
  
  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "persuasive", label: "Persuasive" },
    { value: "academic", label: "Academic" },
    { value: "humorous", label: "Humorous" },
    { value: "formal", label: "Formal" },
    { value: "enthusiastic", label: "Enthusiastic" }
  ];
  
  const styleOptions = [
    { value: "concise", label: "Concise" },
    { value: "detailed", label: "Detailed" },
    { value: "creative", label: "Creative" },
    { value: "instructional", label: "Instructional" },
    { value: "narrative", label: "Narrative" },
    { value: "poetic", label: "Poetic" },
    { value: "technical", label: "Technical" },
    { value: "conversational", label: "Conversational" }
  ];
  
  // Word count options
  const wordCountOptions = [
    { value: "100", label: "Very Short (~100 words)" },
    { value: "300", label: "Short (~300 words)" },
    { value: "500", label: "Medium (~500 words)" },
    { value: "800", label: "Long (~800 words)" },
    { value: "1200", label: "Very Long (~1200 words)" },
    { value: "2000", label: "Extended (~2000 words)" }
  ];

  return (
    <Card className="card-shadow glass">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MessageSquare className="h-6 w-6" /> Text Generation
          {isPremium && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Premium</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              {isPremium && <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>}
              {isPremium && <TabsTrigger value="templates">Templates</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter your prompt here..."
                  className="min-h-[120px] resize-y bg-background/60"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading || credits === 0}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Tone</label>
                  <Select value={tone} onValueChange={setTone} disabled={isLoading || credits === 0}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <Select value={style} onValueChange={setStyle} disabled={isLoading || credits === 0}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {isPremium && (
              <TabsContent value="advanced" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Content Type</label>
                    <Select value={contentType} onValueChange={setContentType} disabled={isLoading || credits === 0}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Target Word Count</label>
                    <Select value={wordCount} onValueChange={setWordCount} disabled={isLoading || credits === 0}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select word count" />
                      </SelectTrigger>
                      <SelectContent>
                        {wordCountOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium block">SEO Keywords (comma separated)</label>
                  <Input
                    placeholder="keyword1, keyword2, keyword3"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    disabled={isLoading || credits === 0}
                  />
                  <p className="text-xs text-muted-foreground">
                    Keywords will be strategically incorporated into the generated content
                  </p>
                </div>
              </TabsContent>
            )}
            
            {isPremium && (
              <TabsContent value="templates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { title: "Blog Post", desc: "Create an engaging blog post" },
                    { title: "Product Description", desc: "Generate compelling product text" },
                    { title: "Email Newsletter", desc: "Craft a professional email" },
                    { title: "Social Media Post", desc: "Perfect for engagement" },
                    { title: "SEO Article", desc: "Optimized for search engines" },
                    { title: "Press Release", desc: "Formal announcement format" }
                  ].map((template, i) => (
                    <div 
                      key={i} 
                      className="border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setContentType(template.title.toLowerCase().replace(" ", ""));
                        setPrompt(`Write a ${template.title.toLowerCase()} about [your topic]`);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">{template.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{template.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Click on a template to use it as a starting point
                </p>
              </TabsContent>
            )}
          </Tabs>
          
          <Button 
            type="submit" 
            className="w-full gradient-bg"
            disabled={isLoading || !prompt.trim() || credits === 0}
          >
            {isLoading ? (
              <>
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Generating...
              </>
            ) : (
              "Generate Text"
            )}
          </Button>
          
          {!isPremium && (
            <p className="text-xs text-center text-muted-foreground">
              <span className="text-primary cursor-pointer" onClick={() => window.location.href = "/pricing"}>
                Upgrade to Premium
              </span>
              {" "}for advanced features, templates, and more options
            </p>
          )}
        </form>
        
        {result && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Result:</h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy size={16} />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-card/60 backdrop-blur-sm rounded-lg whitespace-pre-wrap border">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
