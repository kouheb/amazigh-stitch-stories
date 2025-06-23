
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Search, 
  Menu, 
  Settings, 
  User, 
  LogOut,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { MobileLogo } from "@/components/ui/MobileLogo";
import { Logo } from "@/components/ui/Logo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MainNavbarProps {
  isAuthenticated?: boolean;
  onMenuToggle?: () => void;
  onCreateClick?: () => void;
}

export const MainNavbar = ({ onMenuToggle, onCreateClick }: MainNavbarProps) => {
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

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    }
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Navigate to profile page or trigger profile tab change
    // You can implement this based on your app's routing structure
    toast.info("Profile feature coming soon");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Navigate to settings page
    toast.info("Settings feature coming soon");
  };

  const isAuthenticated = !!user;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {isAuthenticated && onMenuToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden text-gray-700 hover:text-black hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            <div className="block md:hidden">
              <MobileLogo />
            </div>
            <div className="hidden md:block">
              <Logo />
            </div>
          </div>
        </div>

        {/* Center - Search (only when authenticated) */}
        {isAuthenticated && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t('nav.searchPlaceholder')}
                className="pl-9 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleAuthClick}
                className="text-gray-700 hover:text-black hover:bg-gray-100"
              >
                {t('nav.signIn')}
              </Button>
              <Button 
                size="sm"
                onClick={handleAuthClick}
                className="bg-black hover:bg-gray-800 text-white"
              >
                {t('nav.getStarted')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar (only when authenticated) */}
      {isAuthenticated && (
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t('nav.searchMobile')}
              className="pl-9 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
        </div>
      )}
    </nav>
  );
};
