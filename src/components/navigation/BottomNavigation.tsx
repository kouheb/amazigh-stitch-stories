
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  GraduationCap, 
  Calendar, 
  User 
} from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "network", label: "Network", icon: Users },
    { id: "learn", label: "Learn", icon: GraduationCap },
    { id: "events", label: "Events", icon: Calendar },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <IconComponent className={`h-5 w-5 ${isActive ? 'text-orange-600' : 'text-gray-600'}`} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
