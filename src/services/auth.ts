
import { toast } from "sonner";

// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  isPremium: boolean;
  user_metadata?: Record<string, any>;
}

// Mock auth service (replace with real auth integration)
class AuthService {
  private readonly USER_KEY = 'genora_user';
  private readonly TOKEN_KEY = 'genora_token';
  
  // Register new user
  async register(email: string, password: string, name?: string): Promise<User | null> {
    try {
      // Mock registration - in a real app, call your auth provider
      const user: User = {
        id: crypto.randomUUID(),
        email,
        name: name || null,
        isPremium: false,
        user_metadata: { name: name || null }
      };
      
      // Store user in localStorage (simulated backend)
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, crypto.randomUUID());
      
      toast.success("Registration successful!");
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return null;
    }
  }
  
  // Login user
  async login(email: string, password: string): Promise<User | null> {
    try {
      // For demo, check if user exists
      const existingUserStr = localStorage.getItem(this.USER_KEY);
      let user: User;
      
      if (existingUserStr) {
        user = JSON.parse(existingUserStr);
        // Check if emails match (simulated login)
        if (user.email !== email) {
          throw new Error("Invalid credentials");
        }
      } else {
        // For demo purposes, create a new user if none exists
        user = {
          id: crypto.randomUUID(),
          email,
          name: null,
          isPremium: false,
          user_metadata: { name: null }
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }
      
      // Set auth token
      localStorage.setItem(this.TOKEN_KEY, crypto.randomUUID());
      
      toast.success("Login successful!");
      return user;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      return null;
    }
  }
  
  // Logout user
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    toast.info("You've been logged out.");
  }
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  
  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
  
  // Update user details
  updateUser(userData: Partial<User>): User | null {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  }
}

export const authService = new AuthService();
