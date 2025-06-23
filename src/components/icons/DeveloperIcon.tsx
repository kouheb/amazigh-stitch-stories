
import { Logo } from "@/components/ui/Logo";
import { Code } from "lucide-react";

export const DeveloperIcon = () => {
  return (
    <div className="w-[512px] h-[512px] bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Main content container */}
      <div className="flex flex-col items-center justify-center space-y-8 z-10">
        {/* Logo section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <Logo size="xl" showText={false} className="scale-150" />
        </div>
        
        {/* Developer code icon */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
          <Code className="w-16 h-16 text-white" strokeWidth={2.5} />
        </div>
        
        {/* App name */}
        <div className="text-center">
          <h1 className="text-white font-bold text-3xl tracking-tight drop-shadow-lg">
            Fil et Toile
          </h1>
          <p className="text-white/90 font-medium text-lg drop-shadow-md">
            Studio
          </p>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/10 rounded-full"></div>
    </div>
  );
};
