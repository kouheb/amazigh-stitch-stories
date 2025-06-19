
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "./HomePage";
import { NetworkPage } from "./NetworkPage";
import { LearningPage } from "./LearningPage";
import { ArtisanDashboard } from "@/components/dashboard/ArtisanDashboard";

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
        return <div className="p-6"><h1 className="text-2xl font-bold">Events & Community</h1><p>Cultural events and community features coming soon...</p></div>;
      case "profile":
        return <ArtisanDashboard />;
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
