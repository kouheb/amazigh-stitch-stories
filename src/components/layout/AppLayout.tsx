
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
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'block' : 'hidden lg:block'}
      `}>
        <Sidebar 
          activeTab={activeTab}
          onTabChange={(tab) => {
            onTabChange(tab);
            setSidebarOpen(false); // Close sidebar on mobile after selection
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col lg:ml-0">
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
