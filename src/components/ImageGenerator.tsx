
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateImage } from "@/services/api";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import { Download, LucideLoader2 } from "lucide-react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { useCredits, credits } = useCreditsStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt");
      return;
    }
    
    // Check if user has credits (images cost 2 credits)
    if (!useCredits(2)) {
      toast.error("You've run out of credits. Upgrade to premium or wait for your daily reset.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const base64Image = await generateImage(prompt);
      setImageData(base64Image);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("genora_image_history") || "[]");
      history.unshift({
        id: crypto.randomUUID(),
        prompt,
        image: base64Image,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("genora_image_history", JSON.stringify(history.slice(0, 20)));
      
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!imageData) return;
    
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `genora-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-2xl">Image Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              className="min-h-[120px] resize-y"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading || credits < 2}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !prompt.trim() || credits < 2}
          >
            {isLoading ? (
              <>
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Generating...
              </>
            ) : (
              "Generate Image (2 credits)"
            )}
          </Button>
        </form>
        
        {imageData && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Generated Image:</h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <img 
                src={`data:image/png;base64,${imageData}`} 
                alt="Generated"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
