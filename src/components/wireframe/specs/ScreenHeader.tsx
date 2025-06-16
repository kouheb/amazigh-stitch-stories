
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Download, ChevronDown } from "lucide-react";
import { useState } from "react";
import { exportToJSON, exportToCSV, exportToMarkdown } from "./ExportUtils";

interface ScreenHeaderProps {
  screen: {
    title: string;
    category: string;
    description: string;
    layout: any;
    colors: any;
    components: any[];
    interactions: string[];
  };
  screenIndex: number;
  onCopySpecs: () => void;
}

export const ScreenHeader = ({ screen, screenIndex, onCopySpecs }: ScreenHeaderProps) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'json' | 'csv' | 'markdown') => {
    const filename = `${screen.title.toLowerCase().replace(/\s+/g, '-')}-specs`;
    
    switch (format) {
      case 'json':
        exportToJSON(screen, filename);
        break;
      case 'csv':
        exportToCSV(screen.components, filename);
        break;
      case 'markdown':
        exportToMarkdown(screen, filename);
        break;
    }
    
    setShowExportMenu(false);
  };

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
        <div className="relative">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as JSON
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export Components as CSV
                </button>
                <button
                  onClick={() => handleExport('markdown')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as Markdown
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowExportMenu(false)}
        ></div>
      )}
    </div>
  );
};
