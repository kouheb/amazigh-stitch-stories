
import { Palette, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Amazigh Embroidery Designer</h1>
              <p className="text-sm text-gray-600">Create beautiful patterns inspired by Berber traditions</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Palette className="h-4 w-4" />
              <span>Fashion Collection Tool</span>
            </div>
            
            <Link to="/membership">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
