
import { Card } from "@/components/ui/card";
import { Type } from "lucide-react";

interface Component {
  element: string;
  specs: string;
  position: string;
  styling: string;
}

interface ComponentSpecsProps {
  components: Component[];
}

export const ComponentSpecs = ({ components }: ComponentSpecsProps) => {
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-5 w-5 text-green-600" />
        <h4 className="font-semibold text-gray-800">Component Specifications</h4>
      </div>
      <div className="space-y-4">
        {components.map((component, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
            <h5 className="font-medium text-gray-800 mb-2">{component.element}</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Specs:</span>
                <p className="text-gray-700">{component.specs}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Position:</span>
                <p className="text-gray-700">{component.position}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Styling:</span>
                <p className="text-gray-700">{component.styling}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
