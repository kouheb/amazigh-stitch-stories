
import { Logo } from "@/components/ui/Logo";

export const PlayStoreBanner = () => {
  return (
    <div className="w-[1024px] h-[500px] bg-gradient-to-br from-orange-600 via-red-600 to-orange-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-20 h-20 border-2 border-white rounded-lg rotate-12"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-16">
        {/* Left Side - Text Content */}
        <div className="flex-1 text-white">
          <div className="mb-6">
            <Logo size="xl" showText={true} className="mb-4" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Preserving Amazigh
            <br />
            <span className="text-yellow-300">Heritage</span>
          </h1>
          
          <p className="text-xl mb-6 text-orange-100 max-w-md">
            Connect with master artisans, learn traditional crafts, and share your creations with a vibrant community
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-sm">✓</span>
              </div>
              <span className="text-orange-100">Learn Traditional Crafts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-sm">✓</span>
              </div>
              <span className="text-orange-100">Connect with Artisans</span>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Elements */}
        <div className="flex-1 relative">
          {/* Phone Mockup */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-8 bg-gray-50 flex items-center justify-center">
                  <div className="w-20 h-1 bg-gray-800 rounded-full"></div>
                </div>
                
                {/* App Content Preview */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg"></div>
                    <div className="text-xs font-semibold text-gray-800">Fil et Toile Studio</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3">
                    <div className="w-full h-20 bg-orange-300 rounded mb-2"></div>
                    <div className="h-2 bg-orange-400 rounded w-3/4"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-12 h-12 bg-orange-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded w-2/3 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-12 h-12 bg-red-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-80 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-2xl">🧵</span>
          </div>
          
          <div className="absolute bottom-32 right-72 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-xl">✨</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center">
        <div className="text-white text-sm opacity-75">
          Available on Google Play & App Store
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-yellow-300 text-lg">⭐</span>
            <span className="text-white text-sm font-semibold">4.8 Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-green-300 text-lg">👥</span>
            <span className="text-white text-sm font-semibold">10K+ Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};
