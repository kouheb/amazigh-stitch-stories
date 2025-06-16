
import { useState } from "react";
import { Canvas } from "@/components/Canvas";
import { SymbolLibrary } from "@/components/SymbolLibrary";
import { PatternControls } from "@/components/PatternControls";
import { Header } from "@/components/Header";

const Index = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [patternColor, setPatternColor] = useState("#8B4513");
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Symbol Library */}
          <div className="lg:col-span-1">
            <SymbolLibrary 
              selectedSymbol={selectedSymbol}
              onSymbolSelect={setSelectedSymbol}
            />
          </div>
          
          {/* Main Canvas Area */}
          <div className="lg:col-span-2">
            <Canvas 
              selectedSymbol={selectedSymbol}
              patternColor={patternColor}
              showGrid={showGrid}
            />
          </div>
          
          {/* Pattern Controls */}
          <div className="lg:col-span-1">
            <PatternControls 
              patternColor={patternColor}
              setPatternColor={setPatternColor}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
