
import { useState } from "react";
import { MainNavbar } from "@/components/navigation/MainNavbar";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Sidebar } from "@/components/navigation/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppLayout = ({ children, activeTab, onTabChange }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex-1 flex flex-col">
        <MainNavbar 
          isAuthenticated={true} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          {children}
        </main>
        
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};
