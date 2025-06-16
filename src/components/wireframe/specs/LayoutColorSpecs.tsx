
import { Card } from "@/components/ui/card";
import { Layout, Palette } from "lucide-react";

interface LayoutColorSpecsProps {
  layout: {
    container: string;
    dimensions: string;
  };
  colors: Record<string, string>;
}

export const LayoutColorSpecs = ({ layout, colors }: LayoutColorSpecsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-gray-800">Layout Specifications</h4>
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-sm text-gray-600">Container:</span>
            <p className="text-sm">{layout.container}</p>
          </div>
          <div>
            <span className="font-medium text-sm text-gray-600">Dimensions:</span>
            <p className="text-sm">{layout.dimensions}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-purple-600" />
          <h4 className="font-semibold text-gray-800">Color Palette</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: value }}
              ></div>
              <span className="text-xs font-mono">{value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
