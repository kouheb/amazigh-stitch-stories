
import { Header } from "@/components/Header";
import { InteractiveMainNavigation } from "@/components/wireframe/InteractiveMainNavigation";
import { EnhancedWireframeHeader } from "@/components/wireframe/EnhancedWireframeHeader";
import { ArtisanProfile } from "@/components/wireframe/ArtisanProfile";
import { StudioSpaces } from "@/components/wireframe/StudioSpaces";
import { EnhancedLearning } from "@/components/wireframe/EnhancedLearning";
import { EventsCommunity } from "@/components/wireframe/EventsCommunity";
import { ServicesMarketplace } from "@/components/wireframe/ServicesMarketplace";
import { MobileAppFeatures } from "@/components/wireframe/MobileAppFeatures";

const Wireframe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <EnhancedWireframeHeader />
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
