
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateText } from "@/services/api";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import { LucideLoader2 } from "lucide-react";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const generatedText = await generateText(prompt);
      setResult(generatedText);
      
      // Save to history (in a real app, save to database)
      const history = JSON.parse(localStorage.getItem("genora_text_history") || "[]");
      history.unshift({
        id: crypto.randomUUID(),
        prompt,
        result: generatedText,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("genora_text_history", JSON.stringify(history.slice(0, 50)));
    } catch (error) {
      console.error("Failed to generate text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-2xl">Text Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-[120px] resize-y"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading || credits === 0}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
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
            <h3 className="font-semibold mb-2">Result:</h3>
            <div className="p-4 bg-accent/50 rounded-lg whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
