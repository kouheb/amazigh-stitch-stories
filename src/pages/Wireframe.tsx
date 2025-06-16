
import { Header } from "@/components/Header";
import { InteractiveMainNavigation } from "@/components/wireframe/InteractiveMainNavigation";
import { EnhancedWireframeHeader } from "@/components/wireframe/EnhancedWireframeHeader";
import { ArtisanProfile } from "@/components/wireframe/ArtisanProfile";
import { StudioSpaces } from "@/components/wireframe/StudioSpaces";
import { EnhancedLearning } from "@/components/wireframe/EnhancedLearning";
import { EventsCommunity } from "@/components/wireframe/EventsCommunity";
import { ServicesMarketplace } from "@/components/wireframe/ServicesMarketplace";
import { MobileAppFeatures } from "@/components/wireframe/MobileAppFeatures";
import { ScreenFlowDesign } from "@/components/wireframe/ScreenFlowDesign";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Wireframe = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'screenflow'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <EnhancedWireframeHeader />

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={currentView === 'overview' ? 'default' : 'outline'}
            onClick={() => setCurrentView('overview')}
          >
            Feature Overview
          </Button>
          <Button
            variant={currentView === 'screenflow' ? 'default' : 'outline'}
            onClick={() => setCurrentView('screenflow')}
          >
            Complete Screen Flow
          </Button>
        </div>

        {currentView === 'overview' ? (
          <>
            <InteractiveMainNavigation />
            {/* Key Features Layout */}
            <div className="space-y-16">
              <ArtisanProfile />
              <StudioSpaces />
              <EnhancedLearning />
              <EventsCommunity />
              <ServicesMarketplace />
              <MobileAppFeatures />
            </div>
          </>
        ) : (
          <ScreenFlowDesign />
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>Interactive Wireframe Prototype • Built with React & Tailwind CSS</p>
          <p className="text-sm mt-2">Ready for Figma recreation or further development</p>
        </div>
      </div>
    </div>
  );
};

export default Wireframe;
