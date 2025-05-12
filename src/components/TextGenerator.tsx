
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateText } from "@/services/api";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import { Copy, LucideLoader2 } from "lucide-react";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState("professional");
  const [style, setStyle] = useState("concise");
  const { useCredits, credits } = useCreditsStore();
  
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
      // Add tone and style to the prompt
      const enhancedPrompt = `${prompt}\n\nTone: ${tone}\nStyle: ${style}`;
      const generatedText = await generateText(enhancedPrompt);
      setResult(generatedText);
      
      // Save to history (in a real app, save to database)
      const history = JSON.parse(localStorage.getItem("genora_text_history") || "[]");
      history.unshift({
        id: crypto.randomUUID(),
        prompt,
        result: generatedText,
        timestamp: new Date().toISOString(),
        tone,
        style
      });
      localStorage.setItem("genora_text_history", JSON.stringify(history.slice(0, 50)));
    } catch (error) {
      console.error("Failed to generate text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="card-shadow glass">
      <CardHeader>
        <CardTitle className="text-2xl">Text Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
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
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="instructional">Instructional</SelectItem>
                  <SelectItem value="narrative">Narrative</SelectItem>
                  <SelectItem value="poetic">Poetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
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
