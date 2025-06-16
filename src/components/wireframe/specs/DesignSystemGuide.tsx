
import { Card } from "@/components/ui/card";

export const DesignSystemGuide = () => {
  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Figma Recreation Guidelines
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Typography Scale</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• H1: Inter Bold 32px</li>
            <li>• H2: Inter Bold 28px</li>
            <li>• H3: Inter Semibold 24px</li>
            <li>• Body: Inter Regular 16px</li>
            <li>• Caption: Inter Regular 14px</li>
            <li>• Small: Inter Regular 12px</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Spacing System</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• Base unit: 4px</li>
            <li>• XS: 4px</li>
            <li>• SM: 8px</li>
            <li>• MD: 16px</li>
            <li>• LG: 24px</li>
            <li>• XL: 32px</li>
            <li>• XXL: 48px</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Border Radius</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• Small: 4px</li>
            <li>• Medium: 8px</li>
            <li>• Large: 12px</li>
            <li>• XLarge: 16px</li>
            <li>• Round: 50%</li>
            <li>• Pill: 9999px</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Shadows</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• Small: 0 1px 3px rgba(0,0,0,0.1)</li>
            <li>• Medium: 0 4px 8px rgba(0,0,0,0.1)</li>
            <li>• Large: 0 8px 16px rgba(0,0,0,0.1)</li>
            <li>• XLarge: 0 16px 32px rgba(0,0,0,0.1)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
