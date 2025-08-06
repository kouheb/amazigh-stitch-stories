
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "./HomePage";
import { NetworkPage } from "./NetworkPage";
import { LearningPage } from "./LearningPage";
import { EventsPage } from "./EventsPage";
import { ProfilePage } from "./ProfilePage";
import { MessagingTab } from "@/components/messaging/MessagingTab";
import { MarketplacePage } from "./MarketplacePage";
import { TestingPage } from "./TestingPage";
import { ArtisanDashboard } from "@/components/dashboard/ArtisanDashboard";
import ProfileCreationScreen from "@/components/wireframe/ProfileCreationScreen";
import Membership from "./Membership";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalMessaging } from "@/hooks/useGlobalMessaging";
import { supabase } from "@/integrations/supabase/client";

export const MainApp = () => {
  const { user } = useAuth();
  const { unreadCount } = useGlobalMessaging();
  const [activeTab, setActiveTab] = useState("home");
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Check if user profile is complete when user is loaded
  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('full_name, display_name, bio, region, experience_level')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking profile:', error);
          // If there's a network/connection error, allow navigation instead of blocking
          if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
            console.log('Network error detected, allowing navigation');
            setIsProfileComplete(true); // Allow navigation despite error
          } else {
            // If profile doesn't exist, consider it incomplete
            setIsProfileComplete(false);
          }
        } else {
          // Consider profile complete if at least full_name and display_name are filled
          const isComplete = !!(profile?.full_name && profile?.display_name);
          setIsProfileComplete(isComplete);
          
          // If profile is incomplete, automatically show profile creation
          if (!isComplete) {
            setActiveTab("create-profile");
          }
        }
      } catch (error) {
        console.error('Error checking profile completion:', error);
        // On catch errors (like network issues), allow navigation
        console.log('Caught error, allowing navigation');
        setIsProfileComplete(true);
      } finally {
        setCheckingProfile(false);
      }
    };

    checkProfileCompletion();
  }, [user]);

  const handleTabChange = (tab: string) => {
    console.log(`MainApp handleTabChange called with: ${tab}`);
    console.log(`Current isProfileComplete: ${isProfileComplete}`);
    
    // Only prevent navigation if profile is explicitly incomplete (not null or true)
    if (isProfileComplete === false && tab !== "create-profile") {
      console.log("Profile must be completed before navigating");
      return;
    }
    
    console.log(`Tab changed to: ${tab}`);
    setActiveTab(tab);
  };

  const handleProfileComplete = async () => {
    console.log("Profile creation completed");
    setIsProfileComplete(true);
    setActiveTab("home");
  };

  useEffect(() => {
    console.log(`Current active tab: ${activeTab}`);
  }, [activeTab]);

  const renderContent = () => {
    console.log(`Rendering content for tab: ${activeTab}`);
    
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "network":
        return <NetworkPage />;
      case "learn":
        return <LearningPage />;
      case "events":
        return <EventsPage />;
      case "messages":
        return <MessagingTab />;
      case "marketplace":
        return <MarketplacePage />;
      case "profile":
        return <ArtisanDashboard onTabChange={handleTabChange} />;
      case "create-profile":
        return <ProfileCreationScreen onProfileComplete={handleProfileComplete} />;
      case "enhanced-profile":
        return <ProfilePage />;
      case "membership":
        return <Membership />;
      case "testing":
        return <TestingPage />;
      default:
        console.log(`Unknown tab: ${activeTab}, defaulting to home`);
        return <HomePage />;
    }
  };

  // Show loading while checking profile
  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="min-h-full">
        {renderContent()}
      </div>
    </AppLayout>
  );
};
