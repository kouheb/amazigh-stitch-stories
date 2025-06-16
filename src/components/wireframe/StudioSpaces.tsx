
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building, MapPin } from "lucide-react";

export const StudioSpaces = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Art Studios & Workshop Spaces</h2>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button size="sm"><Search className="h-4 w-4 mr-2" />Find Studios</Button>
            <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />List Your Space</Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">Equipment Included</Badge>
            <Badge variant="outline">Hourly Rental</Badge>
            <Badge variant="outline">Monthly Lease</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Creative Loft Studio", type: "Embroidery Workshop", price: "$25/hour" },
            { name: "Artisan Collective", type: "Shared Beading Space", price: "$300/month" },
            { name: "Traditional Craft Center", type: "Teaching Studio", price: "$40/hour" }
          ].map((studio, index) => (
            <Card key={index} className="p-4 border">
              <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="font-medium mb-1">{studio.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{studio.type}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">{studio.price}</span>
                <Button size="sm">Book Now</Button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>Downtown Arts District</span>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};
