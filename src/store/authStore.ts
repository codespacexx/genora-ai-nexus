
import { create } from "zustand";
import { User, authService } from "@/services/auth";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  
  login: async (email: string, password: string) => {
    const user = await authService.login(email, password);
    if (user) {
      set({ user, isLoggedIn: true });
      return true;
    }
    return false;
  },
  
  register: async (email: string, password: string, name?: string) => {
    const user = await authService.register(email, password, name);
    if (user) {
      set({ user, isLoggedIn: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    authService.logout();
    set({ user: null, isLoggedIn: false });
  },
  
  updateUser: (userData) => {
    const updatedUser = authService.updateUser(userData);
    if (updatedUser) {
      set({ user: updatedUser });
    }
  },
  
  loadUser: () => {
    set({ isLoading: true });
    const isLoggedIn = authService.isLoggedIn();
    const user = authService.getCurrentUser();
    set({ user, isLoggedIn, isLoading: false });
  }
}));
