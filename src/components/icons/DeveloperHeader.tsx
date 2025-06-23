
import { Logo } from "@/components/ui/Logo";
import { Code, Palette, Users, Sparkles } from "lucide-react";

export const DeveloperHeader = () => {
  return (
    <div className="w-[4096px] h-[2304px] bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3Ccircle cx='60' cy='20' r='4'/%3E%3Ccircle cx='100' cy='20' r='4'/%3E%3Ccircle cx='20' cy='60' r='4'/%3E%3Ccircle cx='60' cy='60' r='4'/%3E%3Ccircle cx='100' cy='60' r='4'/%3E%3Ccircle cx='20' cy='100' r='4'/%3E%3Ccircle cx='60' cy='100' r='4'/%3E%3Ccircle cx='100' cy='100' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-32 left-64 w-48 h-48 bg-white/10 rounded-full blur-sm"></div>
      <div className="absolute top-96 right-96 w-96 h-96 bg-white/5 rounded-full blur-lg"></div>
      <div className="absolute bottom-64 left-96 w-64 h-64 bg-white/15 rounded-full blur-md"></div>
      
      {/* Main content */}
      <div className="flex items-center justify-center h-full px-32">
        <div className="flex items-center space-x-32 z-10">
          {/* Left side - Logo and branding */}
          <div className="flex flex-col items-center space-y-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-[80px] p-24 shadow-2xl">
              <Logo size="xl" showText={false} className="scale-[4]" />
            </div>
            
            <div className="text-center">
              <h1 className="text-white font-bold text-9xl tracking-tight drop-shadow-lg mb-8">
                Fil et Toile
              </h1>
              <p className="text-white/90 font-medium text-6xl drop-shadow-md mb-4">
                Studio
              </p>
              <p className="text-white/80 font-light text-4xl drop-shadow-sm">
                Artisan Community Platform
              </p>
            </div>
          </div>
          
          {/* Right side - Feature highlights */}
          <div className="flex flex-col space-y-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 flex items-center space-x-8">
              <Users className="w-24 h-24 text-white" strokeWidth={2} />
              <div>
                <h3 className="text-white font-semibold text-4xl mb-2">Connect</h3>
                <p className="text-white/80 text-2xl">Join global artisan community</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 flex items-center space-x-8">
              <Palette className="w-24 h-24 text-white" strokeWidth={2} />
              <div>
                <h3 className="text-white font-semibold text-4xl mb-2">Create</h3>
                <p className="text-white/80 text-2xl">Showcase your masterpieces</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 flex items-center space-x-8">
              <Code className="w-24 h-24 text-white" strokeWidth={2} />
              <div>
                <h3 className="text-white font-semibold text-4xl mb-2">Innovate</h3>
                <p className="text-white/80 text-2xl">Modern tools for artisans</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 flex items-center space-x-8">
              <Sparkles className="w-24 h-24 text-white" strokeWidth={2} />
              <div>
                <h3 className="text-white font-semibold text-4xl mb-2">Inspire</h3>
                <p className="text-white/80 text-2xl">Share your creative journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-center">
        <div className="flex space-x-8">
          <div className="w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="w-24 h-24 bg-white/15 rounded-full"></div>
          <div className="w-20 h-20 bg-white/25 rounded-full"></div>
        </div>
        <div className="text-white/60 text-2xl font-light">
          Connecting Artisans Worldwide
        </div>
        <div className="flex space-x-8">
          <div className="w-20 h-20 bg-white/25 rounded-full"></div>
          <div className="w-24 h-24 bg-white/15 rounded-full"></div>
          <div className="w-16 h-16 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
