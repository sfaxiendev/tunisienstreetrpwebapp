
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { LogIn } from "lucide-react";
import HeaderSection from "../components/ui/HeaderSection";
import { toast } from "sonner";

const Auth = () => {
  const { isAuthenticated, loginWithDiscord, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check for auth-related error messages in the URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const errorDescription = url.searchParams.get('error_description');
    const error = url.searchParams.get('error');
    
    if (error || errorDescription) {
      console.error("Auth error:", error, errorDescription);
      toast.error(errorDescription || "Authentication failed. Please try again.");
      
      // Clean up the URL
      url.searchParams.delete('error_description');
      url.searchParams.delete('error');
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, []);

  // If user is already authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleDiscordLogin = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      await loginWithDiscord();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to initiate login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeaderSection 
        title="Account Access"
        subtitle="Sign in to your account with Discord"
      />
      
      <main className="flex-1 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-secondary/50 p-8 rounded-lg border border-tunisien-red/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Welcome to Tunisien Street RP</h2>
              <p className="text-muted-foreground mt-2">
                Connect with your Discord account to access the dashboard and applications.
              </p>
            </div>
            
            <Button 
              onClick={handleDiscordLogin}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6"
              disabled={isLoading}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {isLoading ? "Connecting..." : "Login with Discord"}
            </Button>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
