
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = "md", showText = true, className }: LogoProps) => {
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
      {/* Logo Icon */}
      <div className={cn(
        "relative rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-lg",
        sizeClasses[size]
      )}>
        {/* Thread pattern */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-2/3 h-2/3 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Needle */}
          <path
            d="M12 2L12 8M12 8C10.5 8 9 9 9 10.5C9 12 10.5 13 12 13C13.5 13 15 12 15 10.5C15 9 13.5 8 12 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Thread curves */}
          <path
            d="M6 15C8 13 10 14 12 16C14 14 16 13 18 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M5 18C7 16 9 17 11 19C13 17 15 16 17 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small dots for texture */}
          <circle cx="8" cy="12" r="0.5" fill="currentColor" opacity="0.6" />
          <circle cx="16" cy="12" r="0.5" fill="currentColor" opacity="0.6" />
        </svg>
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
