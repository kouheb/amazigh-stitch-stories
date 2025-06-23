
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthButtonsProps {
  onAuthClick: () => void;
}

export const AuthButtons = ({ onAuthClick }: AuthButtonsProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onAuthClick}
        className="text-gray-700 hover:text-black hover:bg-gray-100"
      >
        {t('nav.signIn')}
      </Button>
      <Button 
        size="sm"
        onClick={onAuthClick}
        className="bg-black hover:bg-gray-800 text-white"
      >
        {t('nav.getStarted')}
      </Button>
    </div>
  );
};
