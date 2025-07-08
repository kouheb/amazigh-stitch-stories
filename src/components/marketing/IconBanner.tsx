
export const IconBanner = () => {
  return (
    <div className="w-[1200px] h-[600px] bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Pattern - subtle circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 border border-white/50 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 border border-white/50 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        {/* App Icon */}
        <div className="mb-8">
          <div className="w-40 h-40 bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">FT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Symbol */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
            <div className="text-white text-4xl font-light">
              <span>&lt;</span>
              <span className="mx-2">/</span>
              <span>&gt;</span>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold mb-2 drop-shadow-lg">
            Fil et Toile
          </h1>
          <p className="text-3xl font-medium text-orange-100 drop-shadow-lg">
            Studio
          </p>
        </div>

        {/* Tagline */}
        <p className="text-2xl text-orange-100 max-w-2xl leading-relaxed mb-8">
          Connect with Creative Artisans • Artists • Fashion Designers • Build Community
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 text-lg">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-yellow-300">🎨</span>
            <span>Traditional Crafts</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-green-300">🤝</span>
            <span>Community</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-blue-300">📚</span>
            <span>Learning</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-purple-300">🏆</span>
            <span>Heritage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
