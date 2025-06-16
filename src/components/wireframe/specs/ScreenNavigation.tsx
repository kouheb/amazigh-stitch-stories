
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScreenNavigationProps {
  currentScreen: number;
  totalScreens: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const ScreenNavigation = ({ 
  currentScreen, 
  totalScreens, 
  onPrevious, 
  onNext 
}: ScreenNavigationProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentScreen === 0}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous Screen
      </Button>
      <Button
        onClick={onNext}
        disabled={currentScreen === totalScreens - 1}
      >
        Next Screen
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
