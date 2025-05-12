
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { generateImage } from "@/services/api";
import { useCreditsStore } from "@/store/creditsStore";
import { toast } from "sonner";
import { Download, LucideLoader2 } from "lucide-react";

const promptTemplates = [
  {
    name: "Portrait Photo",
    prompt: "A professional portrait of [person], [additional details], high quality, studio lighting",
    icon: "👤"
  },
  {
    name: "Fantasy Scene",
    prompt: "A magical fantasy scene of [subject], ethereal lighting, detailed, vibrant colors",
    icon: "🧙‍♂️"
  },
  {
    name: "Product Showcase",
    prompt: "A professional photo of [product], on white background, studio lighting, high detail",
    icon: "📦"
  },
  {
    name: "Landscape",
    prompt: "A breathtaking landscape of [location], [time of day], cinematic, panoramic view",
    icon: "🏞️"
  },
  {
    name: "Abstract Art",
    prompt: "Abstract art using [colors] and [shapes], modern art style, high resolution",
    icon: "🎨"
  }
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("realistic");
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
      // Enhance prompt with selected style
      const enhancedPrompt = `${prompt}, ${selectedStyle} style, high quality`;
      const base64Image = await generateImage(enhancedPrompt);
      setImageData(base64Image);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("genora_image_history") || "[]");
      history.unshift({
        id: crypto.randomUUID(),
        prompt,
        style: selectedStyle,
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

  const applyTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
  };

  return (
    <Card className="card-shadow glass">
      <CardHeader>
        <CardTitle className="text-2xl">Image Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              className="min-h-[120px] resize-y bg-background/60"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading || credits < 2}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Quick Templates</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {promptTemplates.map((template, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent px-3 py-1.5" 
                  onClick={() => applyTemplate(template.prompt)}
                >
                  {template.icon} {template.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Image Style</label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle} disabled={isLoading || credits < 2}>
              <SelectTrigger className="bg-background/60">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="cartoon">Cartoon</SelectItem>
                <SelectItem value="3d render">3D Render</SelectItem>
                <SelectItem value="oil painting">Oil Painting</SelectItem>
                <SelectItem value="watercolor">Watercolor</SelectItem>
                <SelectItem value="pencil sketch">Pencil Sketch</SelectItem>
                <SelectItem value="digital art">Digital Art</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gradient-bg"
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
            <div className="overflow-hidden rounded-lg border glass">
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
