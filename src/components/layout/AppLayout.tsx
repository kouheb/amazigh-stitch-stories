
import { useState } from "react";
import { MainNavbar } from "@/components/navigation/MainNavbar";
import { Sidebar } from "@/components/navigation/Sidebar";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Footer } from "@/components/layout/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppLayout = ({ children, activeTab, onTabChange }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateClick = () => {
    console.log("Create clicked from navbar");
    onTabChange("create-profile");
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    console.log("AppLayout handling tab change:", tab);
    onTabChange(tab);
    setSidebarOpen(false); // Close sidebar on mobile when navigating
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainNavbar 
        onMenuToggle={handleMenuToggle}
        onCreateClick={handleCreateClick}
        onTabChange={handleTabChange}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <main className="flex-1 lg:ml-64 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <div className="lg:hidden">
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};
