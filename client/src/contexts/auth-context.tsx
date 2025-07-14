import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  tokens: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessFeature: (feature: string) => boolean;
  canAccessContent: (pageNumber?: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const { data: authData, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (authData?.user) {
      setUser(authData.user);
    } else {
      setUser(null);
    }
  }, [authData]);

  const login = (userData: User) => {
    setUser(userData);
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const canAccessFeature = (feature: string): boolean => {
    // Unregistered users can only access basic features
    if (!user) {
      return ["chat_preview", "text_selection", "basic_navigation"].includes(feature);
    }
    
    // Registered users need tokens for premium features
    const premiumFeatures = ["rewrite", "quiz", "study_guide", "passage_discussion", "unlimited_chat"];
    if (premiumFeatures.includes(feature)) {
      return user.tokens > 0;
    }
    
    // Basic features available to all registered users
    return true;
  };

  const canAccessContent = (pageNumber?: number): boolean => {
    // Unregistered users can only access first 5 pages
    if (!user) {
      return !pageNumber || pageNumber <= 5;
    }
    
    // Registered users can access all content
    return true;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    canAccessFeature,
    canAccessContent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}