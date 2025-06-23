
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

export const SearchBar = ({ className = "", isMobile = false }: SearchBarProps) => {
  const { t } = useLanguage();

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={isMobile ? t('nav.searchMobile') : t('nav.searchPlaceholder')}
        className="pl-9 bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
      />
    </div>
  );
};
