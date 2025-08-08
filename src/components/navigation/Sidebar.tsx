
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/Logo";
import { 
  Home, 
  Users, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  User, 
  Crown,
  Settings
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "network", label: "Network", icon: Users },
    { id: "learn", label: "Learn", icon: GraduationCap },
    { id: "events", label: "Events", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "profile", label: "Profile", icon: User },
    { id: "membership", label: "Membership", icon: Crown, premium: true }
  ];

  const handleNavigationClick = (itemId: string) => {
    console.log(`Sidebar nav clicked: ${itemId}`);
    onTabChange(itemId);
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // You can add settings functionality here later
  };

  return (
    <Card className="w-64 h-full p-4 border-r bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <Logo size="lg" showText={true} className="justify-center" />
          <p className="text-sm text-gray-600 mt-2">Thread & Canvas Community</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  isActive 
                    ? "bg-black hover:bg-gray-800 text-white shadow-md" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => handleNavigationClick(item.id)}
              >
                <IconComponent className="h-4 w-4 mr-3" />
                {item.label}
                {item.premium && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-gray-200 text-gray-800">
                    Pro
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        <div className="pt-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-black"
            onClick={handleSettingsClick}
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};
