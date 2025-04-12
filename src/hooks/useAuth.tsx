
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

// Define interface for user profile data from Discord
interface UserProfile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  discord_id: string | null;
}

// Define interface for user data
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  session: Session | null;
  loginWithDiscord: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  // Function to fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data as UserProfile);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  // Check if the user is authenticated on load
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        // Only show toast for meaningful events
        if (event === 'SIGNED_IN') {
          toast.success("Successfully logged in!");
          
          // Fetch user profile when signed in
          if (currentSession?.user?.id) {
            setTimeout(() => {
              fetchUserProfile(currentSession.user.id);
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          toast.info("You have been logged out");
          setUserProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Session exists" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);
      
      // Fetch profile for existing session
      if (currentSession?.user?.id) {
        fetchUserProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    }).catch(error => {
      console.error("Error checking session:", error);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with Discord
  const loginWithDiscord = async () => {
    try {
      setIsLoading(true);
      console.log("Initiating Discord login...");
      
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: window.location.origin + '/auth'
        }
      });
      
      if (error) {
        console.error("Discord login error:", error);
        toast.error(error.message);
      } else {
        console.log("Discord login initiated:", data);
      }
    } catch (err) {
      console.error("Unexpected error during Discord login:", err);
      toast.error("Failed to connect to Discord. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userProfile,
        isLoading,
        session,
        loginWithDiscord,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
