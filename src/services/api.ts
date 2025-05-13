import { toast } from "sonner";

// OpenRouter API Key (do not expose in production)
const OPENROUTER_API_KEY = "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";

// Generate text using OpenRouter DeepSeek API
export const generateText = async (prompt: string) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://yourdomain.com", // optional but recommended
        "X-Title": "Genora AI", // optional title for OpenRouter usage tracking
      },
      body: JSON.stringify({
        model: "deepseek-chat", // or "deepseek-coder" based on your goal
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate text");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Text generation error:", error);
    toast.error("Failed to generate text. Please try again.");
    throw error;
  }
};

// Generate image using OwnAI API
export const generateImage = async (prompt: string) => {
  try {
    const response = await fetch("https://own-ai.onrender.com/api/v1/generateImage", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.1",
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok || !data?.data?.photo) {
      throw new Error("Failed to generate image");
    }

    return data.data.photo; // Base64 string
  } catch (error) {
    console.error("Image generation error:", error);
    toast.error("Image generation failed. Try again later.");
    throw error;
  }
};
