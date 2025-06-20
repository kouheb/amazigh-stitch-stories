
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building, MapPin, Star, DollarSign } from "lucide-react";
import { useState } from "react";
import { StudioBookingModal } from "./StudioBookingModal";

export const StudioSpaces = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<any>(null);

  const studios = [
    { name: "Creative Loft Studio", type: "Embroidery Workshop", price: "$25/hour" },
    { name: "Artisan Collective", type: "Shared Beading Space", price: "$300/month" },
    { name: "Traditional Craft Center", type: "Teaching Studio", price: "$40/hour" }
  ];

  const handleBookStudio = (studio: any) => {
    setSelectedStudio(studio);
    setIsBookingModalOpen(true);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Art Studios & Workshop Spaces</h2>
      
      {/* Prominent Call-to-Action for Listing Spaces */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              Have a Studio or Workshop Space to Rent?
            </h3>
            <p className="text-orange-700 mb-3">
              Join our network of creative spaces and earn money by sharing your studio with fellow artisans
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge className="bg-orange-200 text-orange-800">Earn Extra Income</Badge>
              <Badge className="bg-orange-200 text-orange-800">Build Community</Badge>
              <Badge className="bg-orange-200 text-orange-800">Easy Setup</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8">
              <Plus className="h-5 w-5 mr-2" />
              List Your Space Now
            </Button>
            <p className="text-sm text-orange-600 text-center">It's free to get started!</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button size="sm"><Search className="h-4 w-4 mr-2" />Find Studios</Button>
            <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              <Building className="h-4 w-4 mr-2" />
              Become a Host
            </Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">Equipment Included</Badge>
            <Badge variant="outline">Hourly Rental</Badge>
            <Badge variant="outline">Monthly Lease</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studios.map((studio, index) => (
            <Card key={index} className="p-4 border hover:shadow-lg transition-shadow">
              <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="font-medium mb-1">{studio.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{studio.type}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-green-600">{studio.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500">4.8</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>Downtown Arts District</span>
              </div>
              <Button size="sm" className="w-full" onClick={() => handleBookStudio(studio)}>
                Book Now
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Hosting Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Why List Your Space with Us?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h5 className="font-medium">Earn Money</h5>
                <p className="text-sm text-gray-600">Turn your unused space into income</p>
              </div>
              <div className="text-center">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h5 className="font-medium">Easy Management</h5>
                <p className="text-sm text-gray-600">Simple booking and payment system</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h5 className="font-medium">Quality Community</h5>
                <p className="text-sm text-gray-600">Connect with verified artisans</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {selectedStudio && (
        <StudioBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          studio={selectedStudio}
        />
      )}
    </section>
  );
};
