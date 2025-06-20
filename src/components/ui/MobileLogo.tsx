
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
  const textSize = size * 0.2;

  // Icon-only version (using uploaded logo)
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <img 
          src="/lovable-uploads/c63d0b94-bbae-456c-882d-c8e15f02557d.png"
          alt="Fil et Toile"
          width={size}
          height={size}
          className="object-contain drop-shadow-sm"
        />
      </div>
    );
  }

  // Text-only version
  if (variant === "text") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <span 
          className="font-bold text-black leading-tight"
          style={{ fontSize: textSize * 3 }}
        >
          Fil et Toile
        </span>
        <span 
          className="text-gray-600 leading-tight font-medium"
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
