
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { userScreensData } from "./specs/userScreensData";
import { adminScreensData } from "./specs/adminScreensData";
import { ScreenHeader } from "./specs/ScreenHeader";
import { LayoutColorSpecs } from "./specs/LayoutColorSpecs";
import { ComponentSpecs } from "./specs/ComponentSpecs";
import { InteractionSpecs } from "./specs/InteractionSpecs";
import { DesignSystemGuide } from "./specs/DesignSystemGuide";
import { ScreenNavigation } from "./specs/ScreenNavigation";

export const DetailedScreenSpecs = () => {
  const [selectedCategory, setSelectedCategory] = useState<'user' | 'admin'>('user');
  const [selectedScreen, setSelectedScreen] = useState(0);

  const currentScreens = selectedCategory === 'user' ? userScreensData : adminScreensData;
  const currentScreen = currentScreens[selectedScreen];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCategoryChange = (category: 'user' | 'admin') => {
    setSelectedCategory(category);
    setSelectedScreen(0);
  };

  const handleScreenNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedScreen(Math.max(0, selectedScreen - 1));
    } else {
      setSelectedScreen(Math.min(currentScreens.length - 1, selectedScreen + 1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Detailed Screen Specifications for Figma
        </h2>
        <p className="text-gray-600 mb-6">
          Complete UI specifications with layouts, components, colors, and interactions
        </p>
        
        {/* Category Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant={selectedCategory === 'user' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('user')}
          >
            End User Screens ({userScreensData.length})
          </Button>
          <Button
            variant={selectedCategory === 'admin' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('admin')}
          >
            Admin Backend ({adminScreensData.length})
          </Button>
        </div>
      </div>

      {/* Screen Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {currentScreens.map((screen, index) => (
          <Button
            key={index}
            size="sm"
            variant={selectedScreen === index ? "default" : "outline"}
            onClick={() => setSelectedScreen(index)}
            className="text-xs"
          >
            {screen.title}
          </Button>
        ))}
      </div>

      {/* Main Screen Detail */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <ScreenHeader 
          screen={currentScreen}
          screenIndex={selectedScreen}
          onCopySpecs={() => copyToClipboard(JSON.stringify(currentScreen, null, 2))}
        />

        <p className="text-gray-600 mb-8 text-lg">
          {currentScreen.description}
        </p>

        <LayoutColorSpecs 
          layout={currentScreen.layout}
          colors={currentScreen.colors}
        />

        <ComponentSpecs components={currentScreen.components} />

        <InteractionSpecs interactions={currentScreen.interactions} />

        <ScreenNavigation
          currentScreen={selectedScreen}
          totalScreens={currentScreens.length}
          onPrevious={() => handleScreenNavigation('prev')}
          onNext={() => handleScreenNavigation('next')}
        />
      </Card>

      <DesignSystemGuide />
    </div>
  );
};
