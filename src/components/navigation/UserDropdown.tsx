
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Plus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserDropdownProps {
  onCreateClick?: () => void;
}

export const UserDropdown = ({ onCreateClick }: UserDropdownProps) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    toast.info("Profile feature coming soon");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    toast.info("Settings feature coming soon");
  };

  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
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
      <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-black hover:bg-gray-100">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gray-800 hover:bg-gray-700 text-white text-xs">
          3
        </Badge>
      </Button>

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
