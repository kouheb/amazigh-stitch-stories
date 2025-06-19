
import { cn } from "@/lib/utils";

interface MobileLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "icon" | "text";
}

export const MobileLogo = ({ 
  size = 64, 
  className,
  variant = "full" 
}: MobileLogoProps) => {
  const iconSize = size;
  const textSize = size * 0.2;

  // Icon-only version (perfect for app icons)
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          className="drop-shadow-sm"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          
          {/* Main background */}
          <circle cx="50" cy="50" r="45" fill="url(#bgGradient)" />
          
          {/* Decorative border */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
          
          {/* Needle */}
          <line x1="30" y1="25" x2="70" y2="65" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="27" r="3" fill="#fff" />
          
          {/* Thread/Yarn ball */}
          <circle cx="65" cy="35" r="8" fill="url(#threadGradient)" />
          <path d="M60 30 Q65 25 70 30 Q75 35 70 40 Q65 45 60 40 Q55 35 60 30" 
                fill="#fbbf24" opacity="0.7" />
          
          {/* Decorative stitches */}
          <path d="M25 50 L35 50 M30 45 L30 55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M65 75 L75 75 M70 70 L70 80" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          
          {/* Central design element */}
          <circle cx="50" cy="50" r="4" fill="#fff" opacity="0.9" />
        </svg>
      </div>
    );
  }

  // Text-only version
  if (variant === "text") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <span 
          className="font-bold text-orange-600 leading-tight"
          style={{ fontSize: textSize * 3 }}
        >
          Fil et Toile
        </span>
        <span 
          className="text-orange-500 leading-tight font-medium"
          style={{ fontSize: textSize * 2 }}
        >
          Studio
        </span>
      </div>
    );
  }

  // Full version (icon + text)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <MobileLogo size={size * 0.8} variant="icon" />
      <MobileLogo size={size} variant="text" />
    </div>
  );
};
