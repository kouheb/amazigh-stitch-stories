
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  return (
    <Card className="w-64 h-full p-4 border-r">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Amazigh Nations</h2>
          <p className="text-sm text-gray-600">Craft Community Platform</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? "bg-orange-600 hover:bg-orange-700 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <IconComponent className="h-4 w-4 mr-3" />
                {item.label}
                {item.premium && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-orange-100 text-orange-800">
                    Pro
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        <div className="pt-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-gray-600">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};
