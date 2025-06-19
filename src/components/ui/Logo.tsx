import { cn } from "@/lib/utils";
import { MobileLogo } from "./MobileLogo";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  mobile?: boolean;
}

export const Logo = ({ 
  size = "md", 
  showText = true, 
  className,
  mobile = false 
}: LogoProps) => {
  const sizeMap = {
    sm: 24,
    md: 32, 
    lg: 40,
    xl: 48
  };

  // Use mobile logo for better mobile app experience
  if (mobile) {
    return (
      <MobileLogo 
        size={sizeMap[size]} 
        variant={showText ? "full" : "icon"}
        className={className}
      />
    );
  }

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10",
    xl: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl", 
    xl: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Image */}
      <div className={cn("relative rounded-lg overflow-hidden", sizeClasses[size])}>
        <img 
          src="/lovable-uploads/8fba28bd-b27f-480b-9e50-31474582a243.png"
          alt="Fil et Toile"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-gray-800 leading-tight",
            textSizeClasses[size]
          )}>
            Fil et Toile
          </span>
          <span className={cn(
            "text-gray-600 leading-tight",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"
          )}>
            Studio
          </span>
        </div>
      )}
    </div>
  );
};
