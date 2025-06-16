
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SymbolLibraryProps {
  selectedSymbol: string | null;
  onSymbolSelect: (symbol: string) => void;
}

export const SymbolLibrary = ({ selectedSymbol, onSymbolSelect }: SymbolLibraryProps) => {
  const symbols = [
    {
      id: 'diamond',
      name: 'Diamond',
      meaning: 'Protection & Strength',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 50 10 L 90 50 L 50 90 L 10 50 Z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'star',
      name: 'Star',
      meaning: 'Guidance & Hope',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 50 0 L 59 35 L 97 35 L 68 57 L 76 91 L 50 70 L 24 91 L 32 57 L 3 35 L 41 35 Z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'spiral',
      name: 'Spiral',
      meaning: 'Life & Continuity',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 50 50 Q 50 30 70 30 Q 90 30 90 50 Q 90 80 60 80 Q 20 80 20 50 Q 20 10 60 10 Q 110 10 110 60" 
                fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: 'eye',
      name: 'Eye',
      meaning: 'Protection & Wisdom',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 50 30 Q 70 40 80 50 Q 70 60 50 70 Q 30 60 20 50 Q 30 40 50 30 Z" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="white" />
        </svg>
      )
    },
    {
      id: 'triangle',
      name: 'Triangle',
      meaning: 'Mountain & Stability',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 50 10 L 90 80 L 10 80 Z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'cross',
      name: 'Cross',
      meaning: 'Four Directions',
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <path d="M 40 10 L 60 10 L 60 40 L 90 40 L 90 60 L 60 60 L 60 90 L 40 90 L 40 60 L 10 60 L 10 40 L 40 40 Z" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <Card className="bg-white border-orange-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
        <CardTitle className="text-lg text-gray-800">Amazigh Symbols</CardTitle>
        <CardDescription className="text-gray-600">
          Traditional Berber motifs with cultural significance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {symbols.map((symbol) => (
            <Button
              key={symbol.id}
              variant={selectedSymbol === symbol.id ? "default" : "outline"}
              className={`w-full h-auto p-4 flex items-center gap-3 justify-start ${
                selectedSymbol === symbol.id 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500" 
                  : "border-orange-200 hover:bg-orange-50 hover:border-orange-300"
              }`}
              onClick={() => onSymbolSelect(symbol.id)}
            >
              <div className={`flex-shrink-0 ${selectedSymbol === symbol.id ? 'text-white' : 'text-orange-600'}`}>
                {symbol.svg}
              </div>
              <div className="text-left">
                <div className="font-medium">{symbol.name}</div>
                <div className={`text-xs ${selectedSymbol === symbol.id ? 'text-orange-100' : 'text-gray-500'}`}>
                  {symbol.meaning}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Cultural Note:</strong> These symbols are inspired by traditional Amazigh designs. 
            Each pattern carries deep cultural meaning and represents the rich heritage of North African Berber communities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
