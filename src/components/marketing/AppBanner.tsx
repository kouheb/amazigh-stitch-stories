import { Logo } from "@/components/ui/Logo";

export const AppBanner = () => {
  return (
    <div className="w-[1200px] h-[600px] bg-gradient-to-br from-orange-500 via-red-500 to-orange-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-16 left-16 w-40 h-40 border-2 border-white rounded-full"></div>
        <div className="absolute top-48 right-24 w-32 h-32 border-2 border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-24 left-40 w-36 h-36 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 border-2 border-white rounded-lg rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/30 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-20">
        {/* Left Side - Text Content */}
        <div className="flex-1 text-white">
          <div className="mb-8">
            <Logo size="xl" showText={true} className="mb-6 filter drop-shadow-lg" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Connect with
            <br />
            <span className="text-yellow-300">Creative Artisans</span>
          </h1>
          
          <p className="text-2xl mb-8 text-orange-100 max-w-lg leading-relaxed">
            Discover traditional crafts, learn from master artisans, and join a vibrant community of creative professionals
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-lg">✓</span>
              </div>
              <span className="text-xl text-orange-100">Learn Traditional Techniques</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-lg">✓</span>
              </div>
              <span className="text-xl text-orange-100">Connect with Master Artisans</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-lg">✓</span>
              </div>
              <span className="text-xl text-orange-100">Showcase Your Creations</span>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Elements */}
        <div className="flex-1 relative">
          {/* App Preview */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-80 h-[600px] bg-gray-900 rounded-[4rem] p-3 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[3.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-10 bg-gray-50 flex items-center justify-center">
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full"></div>
                </div>
                
                {/* App Content Preview */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl"></div>
                    <div className="text-lg font-bold text-gray-800">Fil et Toile Studio</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4">
                    <div className="w-full h-32 bg-orange-300 rounded-lg mb-3"></div>
                    <div className="h-3 bg-orange-400 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-orange-300 rounded w-1/2"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-orange-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-red-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-yellow-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-24 right-96 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <span className="text-3xl">🧵</span>
          </div>
          
          <div className="absolute bottom-40 right-80 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-2xl">✨</span>
          </div>
          
          <div className="absolute top-1/2 right-[480px] w-14 h-14 bg-orange-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl">🎨</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-8 left-20 right-20 flex justify-between items-center">
        <div className="text-white text-lg opacity-80">
          Join thousands of creative artisans and designers
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-yellow-300 text-xl">⭐</span>
            <span className="text-white font-semibold">4.9 Rating</span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-green-300 text-xl">👥</span>
            <span className="text-white font-semibold">15K+ Users</span>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-blue-300 text-xl">🏆</span>
            <span className="text-white font-semibold">Award Winner</span>
          </div>
        </div>
      </div>
    </div>
  );
};
