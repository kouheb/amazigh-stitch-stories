
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MobileLogo } from "@/components/ui/MobileLogo";
import { Logo } from "@/components/ui/Logo";
import { LanguageSelector } from "./LanguageSelector";
import { UserDropdown } from "./UserDropdown";
import { SearchBar } from "./SearchBar";
import { AuthButtons } from "./AuthButtons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface MainNavbarProps {
  isAuthenticated?: boolean;
  onMenuToggle?: () => void;
  onCreateClick?: () => void;
  onTabChange?: (tab: string) => void;
}

export const MainNavbar = ({ onMenuToggle, onCreateClick, onTabChange }: MainNavbarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
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
            <SearchBar />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <UserDropdown onCreateClick={onCreateClick} onTabChange={onTabChange} />
          ) : (
            <AuthButtons onAuthClick={handleAuthClick} />
          )}
        </div>
      </div>

      {/* Mobile search bar (only when authenticated) */}
      {isAuthenticated && (
        <div className="md:hidden mt-3">
          <SearchBar isMobile={true} />
        </div>
      )}
    </nav>
  );
};
