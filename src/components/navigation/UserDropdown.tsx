import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Settings, 
  User, 
  LogOut,
  Plus,
  Key
} from "lucide-react";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserDropdownProps {
  onCreateClick?: () => void;
  onTabChange?: (tab: string) => void;
}

export const UserDropdown = ({ onCreateClick, onTabChange }: UserDropdownProps) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { notificationCount } = useNotifications();

  const handleSignOut = async () => {
    console.log("Sign out clicked");
    const { error } = await signOut();
    if (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    } else {
      console.log("Successfully signed out");
      toast.success("Signed out successfully");
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    console.log("Profile clicked - navigating to enhanced profile");
    if (onTabChange) {
      onTabChange("enhanced-profile");
    } else {
      navigate('/app');
    }
    toast.info("Navigating to profile");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    toast.info("Settings feature coming soon");
  };

  const handleCreateClick = () => {
    console.log("Create button clicked");
    if (onCreateClick) {
      onCreateClick();
    } else {
      toast.info("Create feature coming soon");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Create button - hidden on mobile */}
      <Button 
        size="sm" 
        className="hidden sm:flex bg-black hover:bg-gray-800 text-white"
        onClick={handleCreateClick}
      >
        <Plus className="h-4 w-4 mr-1" />
        {t('nav.create')}
      </Button>

      {/* Notifications */}
      <NotificationDropdown 
        notificationCount={notificationCount}
        onNotificationCountChange={() => {}} // No longer needed since we use shared state
      />

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
              <AvatarFallback className="bg-gray-200 text-gray-800">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg z-50" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium text-gray-900">{user?.email}</p>
              <p className="w-[200px] truncate text-sm text-gray-600">
                {user?.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem 
            className="text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer"
            onClick={handleProfileClick}
          >
            <User className="mr-2 h-4 w-4" />
            <span>{t('nav.profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer"
            onClick={handleSettingsClick}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('nav.settings')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer"
            onClick={() => navigate('/settings/api-keys')}
          >
            <Key className="mr-2 h-4 w-4" />
            <span>API Keys</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem 
            className="text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('nav.logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};