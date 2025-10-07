
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
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
import { AppBannerPage } from "./pages/AppBannerPage";
import { IconBannerPage } from "./pages/IconBannerPage";
import { DeveloperIconPage } from "./pages/DeveloperIconPage";
import { DeveloperHeaderPage } from "./pages/DeveloperHeaderPage";
import { MessagingPage } from "./pages/MessagingPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { DeleteAccountPage } from "./pages/DeleteAccountPage";
import { PlayStoreGraphicsPage } from "./pages/PlayStoreGraphicsPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { ProfilePage } from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { LearningPage } from "./pages/LearningPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LearningCreatorDashboard } from "./pages/LearningCreatorDashboard";
import { LearningStudentDashboard } from "./pages/LearningStudentDashboard";
import { RealtimeMessageToaster } from "./components/notifications/RealtimeMessageToaster";
import { MarketplaceProductsPage } from "./pages/MarketplaceProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { queryClient } from "@/lib/queryClient";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Global realtime message notifications */}
            <RealtimeMessageToaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/wireframe" element={<Wireframe />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/delete-account" element={<DeleteAccountPage />} />
                <Route path="/playstore-banner" element={<PlayStoreBannerPage />} />
                <Route path="/app-banner" element={<AppBannerPage />} />
                <Route path="/icon-banner" element={<IconBannerPage />} />
                <Route path="/developer-icon" element={<DeveloperIconPage />} />
                <Route path="/developer-header" element={<DeveloperHeaderPage />} />
                <Route path="/playstore-graphics" element={<PlayStoreGraphicsPage />} />
                <Route path="/app" element={
                  <ProtectedRoute>
                    <MainApp />
                  </ProtectedRoute>
                } />
                <Route path="/messaging" element={
                  <ProtectedRoute>
                    <MessagingPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile/:username" element={
                  <ProtectedRoute>
                    <PublicProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/profile/id/:id" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                {/* Learning public browse and detail */}
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/learning/course/:id" element={<CourseDetailPage />} />
                {/* Marketplace public browse and product details */}
                <Route path="/marketplace" element={<MarketplaceProductsPage />} />
                <Route path="/marketplace/product/:id" element={<ProductDetailPage />} />
                {/* Creator and Student dashboards */}
                <Route path="/learning/creator" element={
                  <ProtectedRoute>
                    <LearningCreatorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/learning/my" element={
                  <ProtectedRoute>
                    <LearningStudentDashboard />
                  </ProtectedRoute>
                } />
                {/* Analytics Dashboard */}
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <AnalyticsDashboard />
                  </ProtectedRoute>
                } />
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
