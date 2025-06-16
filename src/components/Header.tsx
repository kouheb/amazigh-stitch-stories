
import { Palette, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Amazigh Embroidery Designer</h1>
              <p className="text-sm text-gray-600">Create beautiful patterns inspired by Berber traditions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Palette className="h-4 w-4" />
            <span>Fashion Collection Tool</span>
          </div>
        </div>
      </div>
    </header>
  );
};
