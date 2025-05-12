
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function QuickTips() {
  const tips = [
    "Be specific with your prompts for better AI output.",
    "Include details on tone, style, and context in text generation.",
    "For image generation, describe lighting, angle, and mood.",
    "Save your favorite prompts to reuse them later.",
    "Try different approaches if you don't get ideal results initially.",
    "Use longer, more detailed prompts for complex outputs.",
    "Experiment with different style options for images.",
    "Break down complex requests into multiple simpler ones.",
    "Remember that AI output may need human refinement.",
    "Try using reference images for more accurate image generation."
  ];

  return (
    <Card className="backdrop-blur-sm bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
          Pro Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[180px] pr-4">
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
