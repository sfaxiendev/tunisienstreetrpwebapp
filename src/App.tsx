
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Import pages
import Index from "./pages/Index";
import Rules from "./pages/Rules";
import Applications from "./pages/Applications";
import WhitelistApp from "./pages/WhitelistApp";
import AdminApp from "./pages/AdminApp";
import GangApp from "./pages/GangApp";
import PatchNotes from "./pages/PatchNotes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/whitelist" element={<WhitelistApp />} />
            <Route path="/applications/admin" element={<AdminApp />} />
            <Route path="/applications/gang" element={<GangApp />} />
            <Route path="/patch-notes" element={<PatchNotes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
