
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Eye, Smartphone, Monitor } from "lucide-react";

export const EnhancedWireframeHeader = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="text-center mb-12 space-y-6">
      <div className="space-y-4">
        <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
          Interactive Prototype • Version 1.0
        </Badge>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Amazigh Nations App
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A comprehensive platform for fashion designers, seamstresses, artisans, and craftspeople 
          to network, offer services, hire talent, share knowledge through classes, workshops, and art studios.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === 'desktop' ? 'default' : 'ghost'}
            onClick={() => setViewMode('desktop')}
            className="gap-2"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'mobile' ? 'default' : 'ghost'}
            onClick={() => setViewMode('mobile')}
            className="gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">500+</div>
          <div className="text-sm text-gray-600">Active Artisans</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">50+</div>
          <div className="text-sm text-gray-600">Monthly Workshops</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">25+</div>
          <div className="text-sm text-gray-600">Studio Partnerships</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-600">Cultural Events</div>
        </div>
      </div>
    </div>
  );
};
