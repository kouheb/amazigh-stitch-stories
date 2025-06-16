
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Grid, Palette, Info } from "lucide-react";

interface PatternControlsProps {
  patternColor: string;
  setPatternColor: (color: string) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

export const PatternControls = ({ 
  patternColor, 
  setPatternColor, 
  showGrid, 
  setShowGrid 
}: PatternControlsProps) => {
  const traditionColors = [
    { name: 'Terracotta', value: '#B7472A' },
    { name: 'Desert Sand', value: '#D4A574' },
    { name: 'Deep Blue', value: '#1E3A8A' },
    { name: 'Olive Green', value: '#6B7280' },
    { name: 'Saffron', value: '#F59E0B' },
    { name: 'Burgundy', value: '#7C2D12' },
    { name: 'Ivory', value: '#F8F7F4' },
    { name: 'Charcoal', value: '#374151' },
  ];

  return (
    <Card className="bg-white border-orange-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
        <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Pattern Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Grid Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Grid className="h-4 w-4" />
              Show Grid
            </Label>
            <Switch
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
          </div>
          <p className="text-xs text-gray-500">
            Toggle grid lines to help with precise symbol placement
          </p>
        </div>

        <Separator className="bg-orange-100" />

        {/* Color Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Traditional Colors</Label>
          <div className="grid grid-cols-2 gap-2">
            {traditionColors.map((color) => (
              <Button
                key={color.value}
                variant={patternColor === color.value ? "default" : "outline"}
                className={`h-12 flex items-center gap-2 p-2 ${
                  patternColor === color.value
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "border-orange-200 hover:bg-orange-50"
                }`}
                onClick={() => setPatternColor(color.value)}
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-xs font-medium">{color.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-orange-100" />

        {/* Custom Color */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Custom Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={patternColor}
              onChange={(e) => setPatternColor(e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-orange-200 cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">{patternColor}</div>
              <div className="text-xs text-gray-500">Click to customize</div>
            </div>
          </div>
        </div>

        <Separator className="bg-orange-100" />

        {/* Tips */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Design Tips:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Use contrasting colors for visibility</li>
                <li>• Arrange symbols in repeating patterns</li>
                <li>• Consider fabric texture when choosing colors</li>
                <li>• Export at high resolution for embroidery</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
