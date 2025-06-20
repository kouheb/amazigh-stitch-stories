
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, Palette, Users, BookOpen, Calendar, MessageSquare, Crown, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Palette },
    { name: "Community", href: "/app", icon: Users },
    { name: "Learning", href: "/app", icon: BookOpen },
    { name: "Events", href: "/app", icon: Calendar },
    { name: "Messages", href: "/app", icon: MessageSquare },
    { name: "Membership", href: "/membership", icon: Crown },
    { name: "Wireframe", href: "/wireframe", icon: BookOpen },
    { name: "Admin", href: "/admin", icon: Shield },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-200">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
