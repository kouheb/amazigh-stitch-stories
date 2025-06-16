
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface InteractionSpecsProps {
  interactions: string[];
}

export const InteractionSpecs = ({ interactions }: InteractionSpecsProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-orange-600" />
        <h4 className="font-semibold text-gray-800">Interactions & Behaviors</h4>
      </div>
      <ul className="space-y-2">
        {interactions.map((interaction, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">{interaction}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
