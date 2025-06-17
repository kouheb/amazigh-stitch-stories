
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
import { DetailedScreenSpecs } from "@/components/wireframe/DetailedScreenSpecs";
import ProfileCreationScreen from "@/components/wireframe/ProfileCreationScreen";
import { HirePaymentFlow } from "@/components/wireframe/HirePaymentFlow";
import { AfterUploadWork } from "@/components/wireframe/AfterUploadWork";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Wireframe = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'screenflow' | 'detailed' | 'profile' | 'hire-payment' | 'after-upload'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <EnhancedWireframeHeader />

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
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
          <Button
            variant={currentView === 'detailed' ? 'default' : 'outline'}
            onClick={() => setCurrentView('detailed')}
          >
            Detailed Figma Specs
          </Button>
          <Button
            variant={currentView === 'profile' ? 'default' : 'outline'}
            onClick={() => setCurrentView('profile')}
          >
            Profile Creation
          </Button>
          <Button
            variant={currentView === 'hire-payment' ? 'default' : 'outline'}
            onClick={() => setCurrentView('hire-payment')}
          >
            Hire & Payment Flow
          </Button>
          <Button
            variant={currentView === 'after-upload' ? 'default' : 'outline'}
            onClick={() => setCurrentView('after-upload')}
          >
            After Upload Work
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
        ) : currentView === 'screenflow' ? (
          <ScreenFlowDesign />
        ) : currentView === 'detailed' ? (
          <DetailedScreenSpecs />
        ) : currentView === 'profile' ? (
          <ProfileCreationScreen />
        ) : currentView === 'hire-payment' ? (
          <HirePaymentFlow />
        ) : (
          <AfterUploadWork />
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
