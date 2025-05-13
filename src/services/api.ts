import { toast } from "sonner";

// WARNING: Do not expose API keys in production
const GROQ_API_KEY = "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";

// Generate text using Groq API
export const generateText = async (prompt: string) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
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
        Accept: "*/*",
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
