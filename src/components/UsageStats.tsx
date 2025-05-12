
import { Chart, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsageStats() {
  // In a real app, this would come from the backend
  // For now, let's use mock data
  const stats = {
    textGenerated: 23,
    imagesGenerated: 8,
  };

  return (
    <Card className="backdrop-blur-sm bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Chart className="mr-2 h-5 w-5 text-muted-foreground" />
          Usage Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Text Generated</span>
              <span className="text-sm text-muted-foreground">{stats.textGenerated}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-genora-blue to-genora-purple" 
                style={{ width: `${Math.min(100, stats.textGenerated * 3)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Images Generated</span>
              <span className="text-sm text-muted-foreground">{stats.imagesGenerated}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-genora-purple to-genora-deep-purple" 
                style={{ width: `${Math.min(100, stats.imagesGenerated * 5)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
