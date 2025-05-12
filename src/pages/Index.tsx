
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="py-4 px-6 flex justify-between items-center">
        <Logo size="md" withText />
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button 
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Next-Gen AI Assistant <br/>for Creators
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Generate stunning images and professional text content with Genora AI's powerful artificial intelligence platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="gradient-bg text-white px-8"
              onClick={() => navigate("/register")}
            >
              Start Creating
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="bg-accent/30 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Create with <span className="gradient-text">Genora AI</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                title="Text Generation"
                description="Create professional content, stories, articles, and more with our advanced text generation model."
                iconType="text"
              />
              <FeatureCard
                title="Image Generation"
                description="Transform your ideas into stunning visuals with our powerful image generation technology."
                iconType="image"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to bring your ideas to life?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators already using Genora AI to power their creative workflows.
            </p>
            <Button
              size="lg"
              className="gradient-bg text-white px-8"
              onClick={() => navigate("/register")}
            >
              Get Started Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Logo size="sm" withText />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Genora AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  iconType 
}: { 
  title: string; 
  description: string; 
  iconType: "text" | "image" 
}) => {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow flex flex-col h-full">
      <div className="w-12 h-12 rounded-lg mb-5 flex items-center justify-center gradient-bg">
        {iconType === "text" ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
            <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
