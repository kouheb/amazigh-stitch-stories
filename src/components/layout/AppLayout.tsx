
import { useState } from "react";
import { MainNavbar } from "@/components/navigation/MainNavbar";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Sidebar } from "@/components/navigation/Sidebar";
import { AddWorkModal } from "@/components/modals/AddWorkModal";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppLayout = ({ children, activeTab, onTabChange }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    console.log(`AppLayout handling tab change: ${tab}`);
    onTabChange(tab);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleMenuToggle = () => {
    console.log("Menu toggle clicked");
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateClick = () => {
    console.log("Opening Add Work Modal from AppLayout");
    setIsAddWorkModalOpen(true);
  };

  const handleWorkAdded = (work: any) => {
    console.log("New work added:", work);
    setIsAddWorkModalOpen(false);
  };

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
          onTabChange={handleTabChange}
        />
      </div>
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <MainNavbar 
          isAuthenticated={true} 
          onMenuToggle={handleMenuToggle}
          onCreateClick={handleCreateClick}
        />
        
        <main className="flex-1 overflow-auto pb-16 md:pb-0 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Add Work Modal */}
      <AddWorkModal
        isOpen={isAddWorkModalOpen}
        onClose={() => setIsAddWorkModalOpen(false)}
        onWorkAdded={handleWorkAdded}
      />
    </div>
  );
};
