
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

interface ScreenHeaderProps {
  screen: {
    title: string;
    category: string;
    description: string;
  };
  screenIndex: number;
  onCopySpecs: () => void;
}

export const ScreenHeader = ({ screen, screenIndex, onCopySpecs }: ScreenHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          {screenIndex + 1}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            {screen.title}
          </h3>
          <Badge className="mt-1">{screen.category}</Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onCopySpecs}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Specs
        </Button>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
