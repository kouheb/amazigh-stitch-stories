
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricObject, Path, Group } from "fabric";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";

interface CanvasProps {
  selectedSymbol: string | null;
  patternColor: string;
  showGrid: boolean;
}

export const Canvas = ({ selectedSymbol, patternColor, showGrid }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: "#fefefe",
    });

    setFabricCanvas(canvas);
    toast("Canvas ready! Select a symbol to start designing", {
      icon: "✨",
      duration: 3000,
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    
    // Toggle grid
    if (showGrid) {
      drawGrid();
    } else {
      removeGrid();
    }
  }, [showGrid, fabricCanvas]);

  const drawGrid = () => {
    if (!fabricCanvas) return;
    
    const gridSize = 20;
    const canvasWidth = fabricCanvas.width || 600;
    const canvasHeight = fabricCanvas.height || 400;
    
    // Remove existing grid
    removeGrid();
    
    const gridLines = [];
    
    // Vertical lines
    for (let i = 0; i <= canvasWidth; i += gridSize) {
      const line = new Path(`M ${i} 0 L ${i} ${canvasHeight}`, {
        stroke: '#e5e7eb',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
        name: 'grid-line'
      });
      gridLines.push(line);
    }
    
    // Horizontal lines
    for (let i = 0; i <= canvasHeight; i += gridSize) {
      const line = new Path(`M 0 ${i} L ${canvasWidth} ${i}`, {
        stroke: '#e5e7eb',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
        name: 'grid-line'
      });
      gridLines.push(line);
    }
    
    // Add grid lines to canvas and send each to back individually
    gridLines.forEach(line => {
      fabricCanvas.add(line);
      fabricCanvas.sendObjectToBack(line);
    });
    fabricCanvas.renderAll();
  };

  const removeGrid = () => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    const gridLines = objects.filter((obj: FabricObject) => (obj as any).name === 'grid-line');
    gridLines.forEach(line => fabricCanvas.remove(line));
    fabricCanvas.renderAll();
  };

  const addSymbolToCanvas = (symbolPath: string) => {
    if (!fabricCanvas) return;

    const symbol = new Path(symbolPath, {
      left: Math.random() * 300 + 50,
      top: Math.random() * 200 + 50,
      fill: patternColor,
      stroke: patternColor,
      strokeWidth: 2,
      scaleX: 0.8,
      scaleY: 0.8,
    });

    fabricCanvas.add(symbol);
    fabricCanvas.setActiveObject(symbol);
    fabricCanvas.renderAll();
    
    toast("Symbol added to canvas!", {
      icon: "🎨",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (selectedSymbol && fabricCanvas) {
      const symbolPaths = {
        diamond: 'M 50 10 L 90 50 L 50 90 L 10 50 Z',
        star: 'M 50 0 L 59 35 L 97 35 L 68 57 L 76 91 L 50 70 L 24 91 L 32 57 L 3 35 L 41 35 Z',
        spiral: 'M 50 50 Q 50 30 70 30 Q 90 30 90 50 Q 90 80 60 80 Q 20 80 20 50 Q 20 10 60 10 Q 110 10 110 60',
        eye: 'M 50 30 Q 70 40 80 50 Q 70 60 50 70 Q 30 60 20 50 Q 30 40 50 30 Z M 50 45 Q 55 50 50 55 Q 45 50 50 45',
        triangle: 'M 50 10 L 90 80 L 10 80 Z',
        cross: 'M 40 10 L 60 10 L 60 40 L 90 40 L 90 60 L 60 60 L 60 90 L 40 90 L 40 60 L 10 60 L 10 40 L 40 40 Z'
      };
      
      if (symbolPaths[selectedSymbol as keyof typeof symbolPaths]) {
        addSymbolToCanvas(symbolPaths[selectedSymbol as keyof typeof symbolPaths]);
      }
    }
  }, [selectedSymbol, fabricCanvas, patternColor]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    const nonGridObjects = objects.filter((obj: FabricObject) => (obj as any).name !== 'grid-line');
    nonGridObjects.forEach(obj => fabricCanvas.remove(obj));
    
    fabricCanvas.renderAll();
    toast("Canvas cleared!", {
      icon: "🧹",
      duration: 2000,
    });
  };

  const handleZoomIn = () => {
    if (!fabricCanvas) return;
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    fabricCanvas.setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  const handleZoomOut = () => {
    if (!fabricCanvas) return;
    const newZoom = Math.max(zoom / 1.2, 0.5);
    setZoom(newZoom);
    fabricCanvas.setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `amazigh-pattern-${Date.now()}.png`;
    link.click();
    
    toast("Pattern exported successfully!", {
      icon: "📥",
      duration: 3000,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
      <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Design Canvas</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="border-orange-200 hover:bg-orange-50"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 px-2">{Math.round(zoom * 100)}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="border-orange-200 hover:bg-orange-50"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-orange-200 hover:bg-orange-50"
            >
              <RotateCcw className="h-4 w-4" />
              Clear
            </Button>
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="border-2 border-dashed border-orange-200 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="block" />
        </div>
      </div>
    </div>
  );
};
