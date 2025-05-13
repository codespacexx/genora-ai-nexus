
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Send, Copy, Download, Eraser, Code } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function CodeHelper() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponses = [
        "```javascript\nfunction calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\n```\n\nThis function takes an array of items with a price property and returns the sum of all prices.",
        "```python\ndef reverse_string(s):\n    return s[::-1]\n\n# Example usage\nprint(reverse_string('hello'))  # Outputs: 'olleh'\n```",
        "```typescript\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nconst getUser = async (id: string): Promise<User> => {\n  const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) throw new Error('User not found');\n  return response.json();\n};\n```",
      ];
      
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      setResponse(mockResponses[randomIndex]);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-brand-accent/10">
            <Code size={24} className="text-brand-accent" />
          </div>
          <h1 className="text-3xl font-bold">Code Helper</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Code Assistant</CardTitle>
              <CardDescription>
                Ask any coding question and get AI-generated code snippets and explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code-generation">
                <TabsList className="mb-6">
                  <TabsTrigger value="code-generation">Code Generation</TabsTrigger>
                  <TabsTrigger value="code-explanation">Code Explanation</TabsTrigger>
                  <TabsTrigger value="code-optimization">Code Optimization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="code-generation" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <textarea 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the code you want to generate, e.g. 'Write a function to calculate the total price of items in a shopping cart'"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="gap-2" disabled={isLoading}>
                        {isLoading ? "Generating..." : "Generate Code"}
                        <Send size={16} />
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="code-explanation" className="mt-0">
                  <p className="text-muted-foreground mb-4">
                    Paste your code below and get an explanation of how it works.
                  </p>
                  {/* Similar form structure for code explanation tab */}
                </TabsContent>
                
                <TabsContent value="code-optimization" className="mt-0">
                  <p className="text-muted-foreground mb-4">
                    Paste your code for AI optimization suggestions.
                  </p>
                  {/* Similar form structure for code optimization tab */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {response && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Generated Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-md p-4 overflow-x-auto relative font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{response}</pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5">
                  <Copy size={14} />
                  Copy Code
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download size={14} />
                  Download
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setResponse("")} className="gap-1.5">
                  <Eraser size={14} />
                  Clear
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3">Suggested Prompts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Create a React component that displays a loading spinner",
                "Write a function to sort an array of objects by a specific property",
                "Generate a TypeScript interface for user profile data",
                "Create a function to format a date in YYYY-MM-DD format"
              ].map((prompt, i) => (
                <Card 
                  key={i} 
                  className="cursor-pointer hover:border-brand-accent/50 transition-all"
                  onClick={() => setQuery(prompt)}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <p className="text-sm">{prompt}</p>
                    <ArrowRight size={16} className="text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
