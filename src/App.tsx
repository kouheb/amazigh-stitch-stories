
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Membership from "./pages/Membership";
import Wireframe from "./pages/Wireframe";
import AdminDashboard from "./pages/AdminDashboard";
import { MainApp } from "./pages/MainApp";
import { AuthPage } from "./pages/AuthPage";
import { PlayStoreBannerPage } from "./pages/PlayStoreBannerPage";
import { DeveloperIconPage } from "./pages/DeveloperIconPage";
import { DeveloperHeaderPage } from "./pages/DeveloperHeaderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/wireframe" element={<Wireframe />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/app" element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              } />
              <Route path="/playstore-banner" element={<PlayStoreBannerPage />} />
              <Route path="/developer-icon" element={<DeveloperIconPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
