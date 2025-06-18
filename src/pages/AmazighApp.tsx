
import { useState } from "react";
import { MainNavbar } from "@/components/navigation/MainNavbar";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { ArtisanDashboard } from "@/components/dashboard/ArtisanDashboard";
import { Card } from "@/components/ui/card";

const AmazighApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false to see login state

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <ArtisanDashboard />;
      case "network":
        return (
          <div className="p-6">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Network</h2>
              <p className="text-gray-600">Connect with artisans and craftspeople around the world</p>
            </Card>
          </div>
        );
      case "learn":
        return (
          <div className="p-6">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Platform</h2>
              <p className="text-gray-600">Discover workshops and courses to enhance your skills</p>
            </Card>
          </div>
        );
      case "events":
        return (
          <div className="p-6">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Events & Community</h2>
              <p className="text-gray-600">Join cultural events and craft gatherings</p>
            </Card>
          </div>
        );
      case "profile":
        return (
          <div className="p-6">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
              <p className="text-gray-600">Manage your artisan profile and portfolio</p>
            </Card>
          </div>
        );
      default:
        return <ArtisanDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar isAuthenticated={isAuthenticated} />
      
      <main className="pb-20 md:pb-0">
        {renderContent()}
      </main>

      {isAuthenticated && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      )}
    </div>
  );
};

export default AmazighApp;
