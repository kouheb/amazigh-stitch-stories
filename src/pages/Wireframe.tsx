
import { Header } from "@/components/Header";
import { MainNavigation } from "@/components/wireframe/MainNavigation";
import { ArtisanProfile } from "@/components/wireframe/ArtisanProfile";
import { StudioSpaces } from "@/components/wireframe/StudioSpaces";
import { EnhancedLearning } from "@/components/wireframe/EnhancedLearning";
import { EventsCommunity } from "@/components/wireframe/EventsCommunity";
import { ServicesMarketplace } from "@/components/wireframe/ServicesMarketplace";
import { MobileAppFeatures } from "@/components/wireframe/MobileAppFeatures";

const Wireframe = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Amazigh Nations App Wireframe
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform for fashion designers, seamstresses, artisans, and craftspeople 
            to network, offer services, hire talent, share knowledge through classes, workshops, and art studios.
          </p>
        </div>

        <MainNavigation />

        {/* Key Features Layout */}
        <div className="space-y-12">
          <ArtisanProfile />
          <StudioSpaces />
          <EnhancedLearning />
          <EventsCommunity />
          <ServicesMarketplace />
          <MobileAppFeatures />
        </div>
      </div>
    </div>
  );
};

export default Wireframe;
