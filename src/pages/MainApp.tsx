
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "./HomePage";
import { NetworkPage } from "./NetworkPage";
import { LearningPage } from "./LearningPage";
import { EventsPage } from "./EventsPage";
import { ProfilePage } from "./ProfilePage";
import { MessagingPage } from "./MessagingPage";
import { MarketplacePage } from "./MarketplacePage";
import { TestingPage } from "./TestingPage";
import { ArtisanDashboard } from "@/components/dashboard/ArtisanDashboard";
import ProfileCreationScreen from "@/components/wireframe/ProfileCreationScreen";
import Membership from "./Membership";

export const MainApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const handleTabChange = (tab: string) => {
    console.log(`Tab changed to: ${tab}`);
    setActiveTab(tab);
  };

  const handleProfileComplete = () => {
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
        return <MessagingPage />;
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

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="min-h-full">
        {renderContent()}
      </div>
    </AppLayout>
  );
};
