import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "./HomePage";
import { NetworkPage } from "./NetworkPage";
import { LearningPage } from "./LearningPage";
import { EventsPage } from "./EventsPage";
import { ProfilePage } from "./ProfilePage";
import { MessagingPage } from "./MessagingPage";
import { MarketplacePage } from "./MarketplacePage";
import { ArtisanDashboard } from "@/components/dashboard/ArtisanDashboard";
import { Membership } from "./Membership";

export const MainApp = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
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
        return <ArtisanDashboard />;
      case "enhanced-profile":
        return <ProfilePage />;
      case "membership":
        return <Membership />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
};
